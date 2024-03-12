const ProductManager = require('./productManager');

// crea un nuevo producto y lo agrega a la lista de productos
const manager = new ProductManager();
manager.addProduct(
  'Producto prueba',
  'Este es un producto prueba',
  200,
  'Sin imagen',
  'abc123',
  25
);
console.log(manager.getProducts());

// crea otro producto y lo agrega a la lista de productos
const manager2 = new ProductManager();
manager2.addProduct(
  'Producto prueba 2',
  'Este es un producto prueba 2',
  300,
  'Sin imagen',
  'abc124',
  30
);

console.log(manager2.getProducts());

// agregar un producto existeintente

// const manager4 = new ProductManager();
// manager.addProduct(
//   'Producto prueba 4',
//   'Este es un producto prueba 4',
//   500,
//   'Sin imagen',
//   'abc123',
//   40
// );

// console.log(manager4.getProducts());

// error al intentar agregar producto con campo faltante

// const manager3 = new ProductManager();
// manager3.addProduct(
//   'Producto prueba 3',
//   'Este es un producto prueba 3',
//   400,
//   'Sin imagen',
//   35
// );

// console.log(manager3.getProducts());

// error al intentar obtener un producto que no existe
console.log(manager.getProductById(5));


