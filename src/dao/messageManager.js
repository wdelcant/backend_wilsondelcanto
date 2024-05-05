import Message from './models/message.model.js';

export default class MessageManager {
  async getMessages() {
    return await Message.find();
  }

  async addMessage(message) {
    const newMessage = new Message(message);
    await newMessage.save();
    return newMessage;
  }

  async deleteMessage(id) {
    await Message.findByIdAndDelete(id);
  }

  async deleteAllMessages() {
    await Message.deleteMany({});
  }
  
}