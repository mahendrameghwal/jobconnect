import mongoose from 'mongoose';

const EvaluationSchema = new mongoose.Schema({
  // During scheduling we only capture the skill name. Details like score/feedback can be added upon completion.
  skill: { type: String, required: true, trim: true },
  score: { type: Number, min: 0, max: 10 },
  feedback: { type: String, trim: true }
}, { _id: false });

const InterviewSchema = new mongoose.Schema({
  // Core
  title: { type: String, required: true },
  roundTitle: { type: String, default: '' },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  round: { type: Number, default: 1, min: 1 },
  interviewerOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'Org', required: true },
  employerUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'candidate', required: true },
  // Scheduling
  scheduledStart: { type: Date, required: true },
  scheduledEnd: { type: Date, required: true },
  timezone: { type: String, default: 'UTC' },
  // Participants
  attendees: [
    {
      email: { type: String, lowercase: true, trim: true },
      role: { type: String, enum: ['employer', 'candidate', 'interviewer', 'other'], default: 'other' },
    },
  ],
  // Evaluation schema per skill/criteria/parameter
  evaluations: [EvaluationSchema],
  // Free-form fields
  notes: { type: String },
  feedback: { type: String },
  // Meeting
  meetingPlatform: { type: String, enum: ['google_meet', 'other'], default: 'other' },
  meetingLink: { type: String },
  calendarEventId: { type: String },
  // Status
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
}, { timestamps: true });

// Validation rules:
// - When status is 'scheduled', evaluations must only contain 'skill' (no criteria/parameter/score/feedback)
// - When status is 'completed', evaluations may contain full details; optionally require at least one evaluation
InterviewSchema.pre('validate', function(next) {
  try {
    const isScheduled = this.status === 'scheduled';
    if (Array.isArray(this.evaluations)) {
      for (const ev of this.evaluations) {
        if (!ev) continue;
        if (isScheduled) {
          // Disallow extra fields during scheduling
          if (
            typeof ev.score === 'number' ||
            (ev.feedback && ev.feedback.trim() !== '')
          ) {
            return next(new Error('Only skill can be set in evaluations while interview is scheduled'));
          }
        }
      }
    }
    return next();
  } catch (e) {
    return next(e);
  }
});

const Interview = mongoose.model('Interview', InterviewSchema);
export default Interview;


