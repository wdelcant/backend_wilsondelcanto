import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
      },
      quantity: Number,
    },
  ],
})

cartSchema.pre('findOne', function () {
  this.populate('products.product')
})

const CartModel = model('Cart', cartSchema)
export default CartModel
