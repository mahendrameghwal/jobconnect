const {
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
  Me
} = require('../controllers/UserAuthController');
const express = require('express');
const VerifyToken = require('../middlewares/verifytoken');
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


module.exports = router;
