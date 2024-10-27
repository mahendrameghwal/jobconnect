import express from 'express';
import {
  sendMessage,
  getMessages,
  DeleteMessage,
  GetChatuser

}from '../controllers/MessageController.js';
const router = express.Router();
import VerifyToken from '../middlewares/verifytoken.js';

router.get('/getmessage',VerifyToken, getMessages);
router.post('/messages', VerifyToken,sendMessage);
router.get('/chatuser', VerifyToken,GetChatuser);
router.delete('/delete', VerifyToken,DeleteMessage);

export default router;
