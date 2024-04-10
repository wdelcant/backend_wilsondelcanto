import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export default class ProductManager {
  constructor(file) {
    this.file = file;
  }

  async getProducts(limit) {
    const data = await readFile(this.file);
    const products = JSON.parse(data);
    return limit ? products.slice(0, limit) : products;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();
    product.id = products.length + 1;
    products.push(product);
    await writeFile(this.file, JSON.stringify(products));
  }

  async updateProduct(id, product) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    products[index] = { ...products[index], ...product };
    await writeFile(this.file, JSON.stringify(products));
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    products.splice(index, 1);
    await writeFile(this.file, JSON.stringify(products));
  }

  async deleteAllProducts() {
    await writeFile(this.file, '[]');
  }
}
