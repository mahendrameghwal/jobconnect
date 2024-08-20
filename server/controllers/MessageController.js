const Message = require('../models/MessageSchema');

// Get all messages sender and  receiver
const getMessages = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.query;
   
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    })
      .sort({ createdAt: 1 })
      .select('sender receiver message onModel createdAt ');

    return res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};

const GetChatuser = async (req, res, next) => {
  try {
    const { senderId } = req.query;
    const chatUsers = await Message.distinct('receiver', { sender: senderId });
    return res.status(200).json(chatUsers);
  } catch (err) {
    next(err);
  }
};
// Send a new message
const sendMessage = async (req, res, next) => {
  const OrgId = req?.user?.Org;
  const CandidateId = req?.user?.candidate;

  try {
    const { receiverId, message, onModel } = req.body;
   
    const newMessage = new Message({
      sender: req?.user?.Isorg ? OrgId : CandidateId,
      receiver: receiverId,
      onModel,
      message,
    });

   
    await newMessage.save();

    return res.status(200).json(newMessage);
  } catch (err) {
    next(err);
  }
};

const DeleteMessage = async (req, res, next) => {
  const { MessageIds } = req.body;

  try {
    if (MessageIds.length > 0) {
      const DeleteMessage = Message.findByIdAndDelete(MessageIds);
      console.log(DeleteMessage);
      return res.status(200).json({ message: 'message delete successfully' });
    } else {
      return res.status(400).json({ message: 'Can not delete message' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMessages,
  sendMessage,
  DeleteMessage,
  GetChatuser,
};
