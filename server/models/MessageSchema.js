import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'onModel',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'onModel',
    required: true,
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Org', 'candidate'],
  },
  message: { type: String, required: [true, 'Please enter your message'] },
  createdAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model('Message', messageSchema);
export default MessageModel;
