const Message = require("../models/MessageSchema");

const ChatSocket = (io) => {
  let activeUsers = new Map();
  let offlineMessages = new Map();

  io.on('connection', (socket) => {

    socket.on('join', async (userId) => {
      socket.join(userId);
      activeUsers.set(socket.id, userId);
      io.emit('userStatusChanged', { userId, online: true });

      if (offlineMessages.has(userId)) {
        socket.emit('catchUpMessages', offlineMessages.get(userId));
        offlineMessages.delete(userId);
      }
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message, onModel }) => {
      try {
        const newMessage = new Message({
          sender: senderId,
          receiver: receiverId,
          message,
          onModel
        });
        await newMessage.save();

        const receiverSocket = Array.from(activeUsers.entries())
          .find(([, id]) => id === receiverId);

        if (receiverSocket) {
          io.to(receiverId).emit('newMessage', newMessage);
        } else {
          if (!offlineMessages.has(receiverId)) {
            offlineMessages.set(receiverId, []);
          }
          offlineMessages.get(receiverId).push(newMessage);
        }

        // Emit the message back to the sender
        socket.emit('newMessage', newMessage);
      } catch (error) {
        socket.emit('messageSaveError', { error: 'Failed to save message' });
      }
    });

    socket.on('disconnect', () => {
      const userId = activeUsers.get(socket.id);
      activeUsers.delete(socket.id);
      if (userId) {
        io.emit('userStatusChanged', { userId, online: false });
      }
    });
  });
};

module.exports = ChatSocket;