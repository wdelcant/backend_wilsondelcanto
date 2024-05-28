import productsModel from './models/products.model.js'

class ProductsMongoManager {
  constructor() {
    this.productsModel = productsModel
  }

  getProducts = async ({ limit = 10, pageNum = 1, sortByPrice, category, status, title }) => {
    let query = {}
    if (category) {
      query = { category: category }
    }
    if (status) {
      query = { status: status }
    }
    if (title) {
      query = { title: title }
    }

    let toSortedByPrice = {}
    if (sortByPrice) {
      toSortedByPrice = { price: parseInt(sortByPrice) }
    }

    return await this.productsModel.paginate(query, { limit: limit, page: pageNum, lean: true, sort: toSortedByPrice })
  }

  addProduct = async (
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails = './images/products.png'
  ) => {
    const newProduct = {
      title: title,
      description: description,
      code: code,
      price: price,
      status: status,
      stock: stock,
      category: category,
      thumbnails: thumbnails
    }
    try {
      return await this.productsModel.collection.insertOne(newProduct)
    } catch (error) {
      throw error
    }
  }
  getProductsById = async (productId) => {
    return await this.productsModel.findOne({ _id: productId }).lean()
  }
  updateProduct = async (productId, updatedProduct) => {
    return await this.productsModel.updateOne({ _id: productId }, { $set: updatedProduct })
  }
  deleteProduct = async (productId) => {
    return await this.productsModel.deleteOne({ _id: productId })
  }
}

export default ProductsMongoManager
