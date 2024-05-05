import express from 'express';
const router = express.Router();
import {
  getHome,
  getRealTimeProducts,
} from '../controllers/product.controller.js';
import { getChat, postMessage } from '../controllers/chat.controller.js';

router.get('/', getHome);
router.get('/realTimeProducts', getRealTimeProducts);
router.get('/chat', getChat);

export default router;
