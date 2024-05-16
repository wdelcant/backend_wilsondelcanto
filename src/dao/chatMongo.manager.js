import { chatsModel } from './models/chat.model.js'

class ChatMongoManager {
  constructor() {
    this.chatsModel = chatsModel
  }

  async getMessages() {
    try {
      return await chatsModel.find()
    } catch (error) {
      throw error
    }
  }

  async addMessage(user, message) {
    const newMessage = {
            user:user,
            message:message
        }
    try {
      console.log(newMessage)
      return await chatsModel.create(newMessage)
    }
    catch (error) {
      throw error
    }
  }

  async deleteMessage(id) {
    try {
      return await chatsModel.findByIdAndDelete(id)
    } catch (error) {
      throw error
    }
  }

  async updateMessage(id, message) {
    try {
      return await chatsModel.findByIdAndUpdate
      (id, { message }, { new: true })
    }
    catch (error) {
      throw error
    }
  }
}

export default ChatMongoManager