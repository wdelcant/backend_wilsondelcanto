const fs = require('fs');

class ProductManager {
  static id = 1;

  constructor(path) {
    this.path = path;
    this.products = fs.existsSync(this.path)
      ? JSON.parse(fs.readFileSync(this.path))
      : [];
    if (this.products.length > 0) {
      ProductManager.id = Math.max(...this.products.map(p => p.id)) + 1;
    }
  }

  addProduct(product) {
    try {
      const newProduct = { id: ProductManager.id++, ...product };
      this.products.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }

  getProducts() {
    try {
      return this.products;
    } catch (error) {
      throw new Error('Error al obtener la lista de productos');
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find(product => product.id === id);
    if (!product) {
      throw new Error('Producto con id no inexistente');
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error(
        'No se puede actualizar un producto con un id que no existe'
      );
    }
    this.products[index] = { ...this.products[index], ...updatedProduct };
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error(
        'No se puede eliminar un producto con un id que no existe'
      );
    }
    const deletedProduct = this.products.splice(index, 1);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return deletedProduct;
  }
}

module.exports = ProductManager;
