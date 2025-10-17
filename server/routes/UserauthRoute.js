import {
   login,
   register,
   logout,
   ResetRequest,
   resetPassword,
   DeleteAcountPerManently,
   GetCurrentUserInfo,
   UserinfoById,
   MultipleUserinfo,
   AcountDeleteRequest,
   Me,
  adminReport,
} from '../controllers/UserAuthController.js';
import express from 'express';
import VerifyToken from '../middlewares/verifytoken.js';
import VerifyAdmin from '../middlewares/VerifyAdmin.js';
// import passport from 'passport';
import jwt from "jsonwebtoken"
import { getGoogleAuthUrl, googleCallback } from '../controllers/GoogleAuthController.js';
const router = express.Router();



router.post('/register', register);
router.post('/login', login);
router.post('/logout', VerifyToken, logout);
router.post('/resetrequest', ResetRequest);
router.post('/acountdelrequest', VerifyToken, AcountDeleteRequest);
router.get('/currentuser', VerifyToken, GetCurrentUserInfo);
router.get('/me', VerifyToken, Me);
router.get('/getinfo/:userid', VerifyToken, UserinfoById);
router.get('/multiple-user-info', VerifyToken, MultipleUserinfo);
router.put('/reset/:token', resetPassword);
router.delete('/delete', VerifyToken, DeleteAcountPerManently);
router.delete('/delete', VerifyToken, DeleteAcountPerManently);

// Admin unified dashboard report
router.get('/admin/report', VerifyAdmin, adminReport);

// Google auth
router.get('/auth/google/url', getGoogleAuthUrl);
router.get('/auth/google/callback', googleCallback);

export default router;
