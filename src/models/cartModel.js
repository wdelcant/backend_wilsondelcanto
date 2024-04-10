import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export default class CartManager {
  constructor(file) {
    this.file = file;
  }

  async getCarts() {
    const data = await readFile(this.file);
    const carts = JSON.parse(data);
    return carts;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = { id: carts.length + 1, products: [] };
    carts.push(newCart);
    await writeFile(this.file, JSON.stringify(carts));
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find(cart => cart.id === cartId);
    if (!cart) return null;
    cart.products.push(productId);
    await writeFile(this.file, JSON.stringify(carts));
    return cart;
  }

  async removeProductFromCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find(cart => cart.id === cartId);
    if (!cart) return null;
    const index = cart.products.findIndex(id => id === productId);
    cart.products.splice(index, 1);
    await writeFile(this.file, JSON.stringify(carts));
    return cart;
  }

  async deleteCart(id) {
    const carts = await this.getCarts();
    const index = carts.findIndex(cart => cart.id === id);
    carts.splice(index, 1);
    await writeFile(this.file, JSON.stringify(carts));
    return carts;
  }
}
