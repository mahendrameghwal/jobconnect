const express = require('express');
const {
  sendMessage,
  getMessages,
  DeleteMessage,
  GetChatuser

} = require('../controllers/MessageController');
const router = express.Router();
const VerifyToken = require('../middlewares/verifytoken');

router.get('/getmessage',VerifyToken, getMessages);
router.post('/messages', VerifyToken,sendMessage);
router.get('/chatuser', VerifyToken,GetChatuser);
router.delete('/delete', VerifyToken,DeleteMessage);

module.exports = router;
