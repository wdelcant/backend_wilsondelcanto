import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  code: String,
  stock: Number,
  category: String,
  thumbnail: String,
});

const Product = model('Product', productSchema);

export default Product;
