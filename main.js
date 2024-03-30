import ProductManager from './productManager.js';

const productManager = new ProductManager('products.json');

for (let i = 1; i <= 15; i++) {
  productManager.addProduct({
    title: `Producto ${i}`,
    description: `Descripción del producto ${i}`,
    price: 10.99 * i,
    thumbnail: `ruta/de/imagen${i}.jpg`,
    code: `PROD00${i}`,
    stock: 100 * i,
  });
}
