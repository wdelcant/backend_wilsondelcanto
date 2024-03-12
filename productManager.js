class ProductManager {
  static id = 1;
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('Todos los campos son obligatorios');
    }

    if (this.products.some(product => product.code === code)) {
      throw new Error('Producto ya existente');
    }

    const product = {
      id: ProductManager.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      console.error('No se encontró el producto con el id', id);
      return;
    }

    return product;
  }
}

module.exports = ProductManager;
