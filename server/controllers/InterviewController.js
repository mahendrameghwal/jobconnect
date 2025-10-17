import asyncHandler from 'express-async-handler';
import Interview from '../models/InterviewSchema.js';
import Job from '../models/jobschema.js';
import Candidate from '../models/Candidateschema.js';
import User from '../models/Userschema.js';
import { google } from 'googleapis';

// Create interview (optionally with existing Google Meet link fields)
export const createInterview = asyncHandler(async (req, res) => {
  const {
    title,
    roundTitle,
    job,
    round,
    candidate,
    scheduledStart,
    scheduledEnd,
    timezone,
    attendees,
    evaluations,
    notes,
    feedback,
    meetingPlatform,
    meetingLink,
  } = req.body;

  // Validate job and candidate exist
  const jobDoc = await Job.findById(job);
  if (!jobDoc) return res.status(404).json({ message: 'Job not found' });
  const candidateDoc = await Candidate.findById(candidate);
  if (!candidateDoc) return res.status(404).json({ message: 'Candidate not found' });

  const interviewerOrg = jobDoc.orgname; // org ObjectId
  const employerUser = req.user._id; // recruiter user id

  const interview = await Interview.create({
    title,
    roundTitle,
    job,
    round,
    candidate,
    scheduledStart,
    scheduledEnd,
    timezone,
    attendees,
    evaluations,
    notes,
    feedback,
    interviewerOrg,
    employerUser,
    meetingPlatform,
    meetingLink,
  });

  // Attempt to add to employer's Google Calendar if refresh token exists
  try {
    const employer = await User.findById(employerUser);
    if (employer?.googleRefreshToken) {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
      );
      oauth2Client.setCredentials({ refresh_token: employer.googleRefreshToken });
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      const candidateUser = await User.findById(candidateDoc.owner);
      const attendeeList = [];
      if (employer?.email) attendeeList.push({ email: employer.email });
      if (candidateUser?.email) attendeeList.push({ email: candidateUser.email });
      // Include any extra attendees provided in payload
      if (Array.isArray(attendees)) {
        for (const a of attendees) {
          if (a?.email) attendeeList.push({ email: a.email });
        }
      }

      // Build a rich description for the calendar event
      const skills = Array.isArray(evaluations)
        ? evaluations.map((e) => `• ${e?.skill || ''}`).filter(Boolean).join('\n')
        : '';
      const roundLabel = [round ? `Round ${round}` : null, roundTitle || null]
        .filter(Boolean)
        .join(' - ');
      const descriptionParts = [
        `Job: ${jobDoc?.title || ''}`,
        `Candidate: ${candidateDoc?.fullname || candidateDoc?.name || ''}`,
        roundLabel ? `Stage: ${roundLabel}` : null,
        `Timezone: ${timezone || 'UTC'}`,
        skills ? `Skills to evaluate:\n${skills}` : null,
        notes ? `Notes:\n${notes}` : null,
        meetingLink ? `Meeting link: ${meetingLink}` : null,
      ].filter(Boolean);
      const descriptionText = descriptionParts.join('\n\n');

      const event = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: roundLabel ? `${title} (${roundLabel})` : title,
          description: descriptionText || 'Interview',
          location: meetingLink ? meetingLink : 'Google Meet',
          start: { dateTime: new Date(scheduledStart).toISOString(), timeZone: timezone || 'UTC' },
          end: { dateTime: new Date(scheduledEnd).toISOString(), timeZone: timezone || 'UTC' },
          attendees: attendeeList,
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 60 },
              { method: 'popup', minutes: 10 },
            ],
          },
          conferenceData: {
            createRequest: { requestId: `iv-${interview._id}` },
          },
          guestsCanInviteOthers: false,
          guestsCanModify: false,
          guestsCanSeeOtherGuests: true,
        },
        conferenceDataVersion: 1,
      });

      interview.calendarEventId = event.data.id || null;
      const meetLink = event?.data?.hangoutLink || (event?.data?.conferenceData?.entryPoints || []).find(p => p.entryPointType === 'video')?.uri;
      if (meetLink) interview.meetingLink = meetLink;
      await interview.save();
    }
  } catch (e) {
    // Non-fatal: if calendar creation fails, we still return interview
  }

  return res.status(201).json({ message: 'Interview scheduled', interview });
});

// List upcoming & past for org or user
export const listMyInterviews = asyncHandler(async (req, res) => {
  const now = new Date();
  const { scope = 'upcoming' } = req.query; // upcoming|past|current|all
  const filter = { employerUser: req.user._id };
  if (scope === 'upcoming') filter.scheduledStart = { $gte: now };
  if (scope === 'past') filter.scheduledEnd = { $lt: now };
  if (scope === 'current') {
    filter.$and = [
      { scheduledStart: { $lte: now } },
      { scheduledEnd: { $gte: now } },
    ];
  }

  const interviews = await Interview.find(filter).populate(['job', 'candidate']);
  return res.status(200).json(interviews);
});

// List interviews for candidate (by candidate profile), excluding feedback in response
export const listCandidateInterviews = asyncHandler(async (req, res) => {
  const now = new Date();
  const { scope = 'upcoming' } = req.query; // upcoming|past|current|all
  // Resolve candidate profile id from auth
  let candidateId = req.user?.candidate;
  if (!candidateId) {
    const cand = await Candidate.findOne({ owner: req.user._id }).select('_id');
    candidateId = cand?._id;
  }
  if (!candidateId) return res.status(404).json([]);

  const filter = { candidate: candidateId };
  if (scope === 'upcoming') filter.scheduledStart = { $gte: now };
  if (scope === 'past') filter.scheduledEnd = { $lt: now };
  if (scope === 'current') {
    filter.$and = [
      { scheduledStart: { $lte: now } },
      { scheduledEnd: { $gte: now } },
    ];
  }

  const interviews = await Interview.find(filter)
    .populate(['job'])
    .select('-feedback -evaluations.feedback');
  return res.status(200).json(interviews);
});

// Update evaluation/feedback
export const updateInterview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const interview = await Interview.findByIdAndUpdate(id, update, { new: true });
  if (!interview) return res.status(404).json({ message: 'Interview not found' });
  return res.status(200).json({ message: 'Interview updated', interview });
});

// Delete / cancel
export const deleteInterview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Interview.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: 'Interview not found' });
  return res.status(200).json({ message: 'Interview deleted' });
});


