import express from 'express'
import {
  getProductById,
  addProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  deleteAllProducts,
} from '../../controllers/product.controller.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:pid', getProductById)
router.post('/', addProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)
router.delete('/', deleteAllProducts)

export default router
