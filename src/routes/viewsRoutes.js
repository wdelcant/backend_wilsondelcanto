import express from 'express';
const router = express.Router();
import {
  getHome,
  getRealTimeProducts,
} from '../controllers/productController.js';

router.get('/', getHome);
router.get('/realTimeProducts', getRealTimeProducts);

export default router;
