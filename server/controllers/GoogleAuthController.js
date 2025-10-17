import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/Userschema.js';
import { google } from 'googleapis';


dotenv.config();

const SECERET_KEY = process?.env?.JWT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI ;

const getClient = () => {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri,
  );
  return client;
};

const SCOPES = [
  'openid',
  'email',
  'profile',
  // Required for creating events and generating Google Meet links
  'https://www.googleapis.com/auth/calendar.events',
];

export const getGoogleAuthUrl = asyncHandler(async (req, res) => {
  const client = getClient();
  const role = typeof req.query.role === 'string' ? req.query.role : undefined; // 'candidate' | 'org'
  const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
    state: role ? JSON.stringify({ role }) : undefined,
  });
  res.status(200).json({ url });
});

export const googleCallback = asyncHandler(async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).json({ message: 'Missing code' });
  const client = getClient();
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: 'v2', auth: client });
  const { data: profile } = await oauth2.userinfo.get();

  // Try to parse optional state carrying role
  let roleFromState; // 'candidate' | 'org'
  if (req.query.state) {
    try {
      const parsed = JSON.parse(req.query.state);
      if (parsed && (parsed.role === 'candidate' || parsed.role === 'org')) {
        roleFromState = parsed.role;
      }
    } catch (_) {
      // ignore malformed state
    }
  }

  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    // If a user exists with this email, link it
    user = await User.findOne({ email: profile.email.toLowerCase() });
    if (user) {
      user.googleId = profile.id;
      await user.save();
    } else {
      // Generate a unique username based on Google profile
      const base = (profile.name || 'user')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 20) || 'user';
      let candidateUsername = base;
      let suffix = 0;
      // Ensure uniqueness
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const exists = await User.findOne({ username: candidateUsername });
        if (!exists) break;
        suffix = suffix === 0 ? Math.floor(1000 + Math.random() * 9000) : suffix + 1;
        candidateUsername = `${base}-${suffix}`.slice(0, 30);
      }

      user = await User.create({
        googleId: profile.id,
        email: profile.email,
        fullname: profile.name || 'Google User',
        username: candidateUsername,
        Isorg: roleFromState === 'org' ? true : false,
      });
    }
  }

  // persist refresh_token for Calendar if present
  if (tokens.refresh_token) {
    user.googleRefreshToken = tokens.refresh_token;
    await user.save();
  }

  const info = {
    _id: user._id,
    email: user.email,
    Isorg: user.Isorg,
    Org: user.Org,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(info, SECERET_KEY, { expiresIn: '24h' });
  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Decide redirect based on whether profile exists already
  const isOrg = Boolean(user.Isorg);
  const hasProfile = isOrg ? Boolean(user.Org) : Boolean(user.candidate);
  const onboardingPath = isOrg ? '/create-company' : '/create-candidate';
  const targetPath = hasProfile ? '/profile' : onboardingPath;
  const baseUrl = (process.env.FRONTEND_APP_URL || 'http://localhost:5173').replace(/\/$/, '');
  const fullRedirect = `${baseUrl}${targetPath}`;

  res
    .cookie('accesstoken', token, {
      httpOnly: true,
      expires: expirationDate,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    .redirect(fullRedirect);
});


