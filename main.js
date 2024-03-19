const ProductManager = require('./productManager');

const productManager = new ProductManager('products.json');

// Ejemplo de uso
productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 10.99,
  thumbnail: 'ruta/de/imagen1.jpg',
  code: 'PROD001',
  stock: 100,
});

productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción del producto 2',
  price: 20.99,
  thumbnail: 'ruta/de/imagen2.jpg',
  code: 'PROD002',
  stock: 50,
});

productManager.addProduct({
  title: 'Producto 3',
  description: 'Descripción del producto 3',
  price: 30.99,
  thumbnail: 'ruta/de/imagen3.jpg',
  code: 'PROD003',
  stock: 10,
});

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
