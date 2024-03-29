const ProductManager = require('./productManager');

const productManager = new ProductManager('products.json');

for (let i = 1; i <= 11; i++) {
  productManager.addProduct({
    title: `Producto ${i}`,
    description: `Descripción del producto ${i}`,
    price: 10.99 * i,
    thumbnail: `ruta/de/imagen${i}.jpg`,
    code: `PROD00${i}`,
    stock: 100 * i,
  });
}

const allProducts = productManager.getProducts();
console.log('Mostrando todos los productos');
console.log(allProducts);

const productById = productManager.getProductById(3);
console.log('Mostrando producto con id 3');
console.log(productById);

productManager.updateProduct(2, { price: 12.99 });
console.log('Actualizando producto con id 2');
console.log(productManager.getProductById(2));

productManager.deleteProduct(1);
console.log('Eliminando producto con id 1');
console.log(productManager.getProducts());
