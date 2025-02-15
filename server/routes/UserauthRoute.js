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
import VerifyToken from '../middlewares/verifytoken.js'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', VerifyToken, logout);
router.post('/resetrequest', ResetRequest);
router.post('/acountdelrequest',VerifyToken, AcountDeleteRequest);
router.get('/currentuser', VerifyToken, GetCurrentUserInfo);
router.get('/me', VerifyToken, Me);
router.get('/getinfo/:userid',VerifyToken, UserinfoById);
router.get('/multiple-user-info',VerifyToken ,MultipleUserinfo);
router.put('/reset/:token', resetPassword);
router.delete('/delete', VerifyToken, DeleteAcountPerManently);
router.delete('/delete', VerifyToken, DeleteAcountPerManently);



export default router;
