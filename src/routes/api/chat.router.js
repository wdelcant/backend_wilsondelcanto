import express from 'express'
import {
  getChat,
  postChat,
} from '../../controllers/chat.controller.js'

const router = express.Router()

router.get('/', getChat)
router.post('/', postChat)

export default router