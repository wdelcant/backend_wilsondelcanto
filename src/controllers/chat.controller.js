import ChatMongoManager from '../../daos/chatMongo.manager.js'

const chatService = new ChatMongoManager()

export const getChat = async (req, res) => {
  try {
    const messages = await chatService.getMessages()
    res.status(200).send({ status: 'success', payload: messages })
  } catch (error) {
    throw error
  }
}

export const postChat = async (req, res) => {
  try {
    const { user, message } = req.body
    const newMessage = await chatService.addMessage(user, message)
    res.send({ status: 'success', payload: newMessage })
  } catch (error) {
    throw error
  }
}
