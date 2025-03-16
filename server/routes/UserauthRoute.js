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
} from '../controllers/UserAuthController.js';
import express from 'express';
import VerifyToken from '../middlewares/verifytoken.js';
// import passport from 'passport';
import jwt from "jsonwebtoken"
const router = express.Router();


// router.get('/auth/google', (req, res, next) => {
//    const { role } = req.query;
//    // Store role in session or pass as state
//    req.session.selectedRole = role;
//    passport.authenticate('google', {
//       scope: ['profile', 'email'],
//       state: role, // Pass role as state
//    })(req, res, next);
// });

// router.get(
//    '/auth/google/callback',
//    passport.authenticate('google', { failureRedirect: '/' , session: false}),
//    async (req, res) => {
//       const user = req.user;
//       const info = {
//          _id: user._id,
//          email: user.email,
//          Isorg: user.Isorg,
//          isAdmin: user.isAdmin,
//          googleId: user.googleId,
//       };

//       const token = jwt.sign(info, process.env.JWT_SECRET, {
//          expiresIn: '24h',
//       });
//      const updatedUser = await user.save();
//      if(updatedUser){
//       const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
//       res.cookie('accesstoken', token, {
//          httpOnly: true,
//          expires: expirationDate, 
//          secure: true,
//          sameSite: 'none',
//          path: '/',
//       });
//       res.redirect(301,`${process.env.FRONTEND_APP_URL}/profile`);
      
//       res.status(201).json({ message: 'user created successfully', data: info });
//     }

//    },
// );

// router.get('/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/login',
//     session: false
//   }),
//   async (req, res) => {
//     const user = req.user; // Use req.user instead of user
//     console.log(`User:`, user);

//     if (!user) {
//       // Create a new user without requiring a password field
//       const newUser = new User({
//         googleId: req.user.googleId,
//         email: req.user.email,
//         fullname: req.user.fullname
//       });

//       try {
//         await newUser.save(); // Use await for better error handling

//         const info = {
//           _id: newUser._id,
//           email: newUser.email,
//           Isorg: newUser.Isorg,
//           isAdmin: newUser.isAdmin,
//           googleId: newUser.googleId
//         };

//         const token = jwt.sign(info, process.env.JWT_SECRET, {
//           expiresIn: '24h',
//         });

//         res.cookie('accesstoken', token, {
//           httpOnly: true,
//           expires: expirationDate, // Ensure expirationDate is defined
//           secure: true,
//           sameSite: 'none',
//           path: '/',
//         });

//         // Redirect after setting the cookie
//         return res.redirect(`${process.env.FRONTEND_APP_URL}/${newUser.Isorg ? 'create-company' : 'create-candidate'}`);
//       } catch (err) {
//         return res.status(500).json({ message: 'Error creating new user' });
//       }
//     }
//   }
// );

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

export default router;
