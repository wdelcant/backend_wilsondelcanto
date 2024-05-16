import express from 'express'
const router = express.Router()
import {
  getProducts,
  getRealTimeProducts,
  getProductById,
} from '../controllers/products.controller.js'
import { getChat } from '../controllers/chat.controller.js'
import { getCartById } from '../controllers/carts.controller.js'

router.get('/products', getProducts )
router.get('/products/:id', getProductById )
router.get('/cart:cid', getCartById)
router.get('/realTimeProducts', getRealTimeProducts)
router.get('/chat', getChat)

export default router
