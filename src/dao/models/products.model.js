import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
  title: String,
  description: String,
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: Number,
  status: Boolean,
  stock: Number,
  category: {
    type: String,
    emum: [
      'computers',
      'accesories',
      'audio',
      'video',
      'cameras',
      'consoles',
      'smartwatches',
      'others',
    ],
  },
  thumbnails: String,
})

productsSchema.plugin(mongoosePaginate)

const productsModel = model('products', productSchema)

export default productsModel
