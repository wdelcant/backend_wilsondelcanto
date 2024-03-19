const fs = require('fs');
const ProductManager = require('./productManager');

describe('ProductManager', () => {
  const filePath = './test_products.json';
  let productManager;

  beforeEach(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    productManager = new ProductManager(filePath);
  });

  test('Se creará una instancia de la clase "ProductManager"', () => {
    expect(productManager instanceof ProductManager).toBeTruthy();
  });

  test('Se llamará "getProducts" recién creada la instancia, debe devolver un arreglo vacío []', () => {
    expect(productManager.getProducts()).toEqual([]);
  });

  test('Se llamará al método "addProduct" y el objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE', () => {
    const product = {
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    };
    const addedProduct = productManager.addProduct(product);
    expect(addedProduct.id).toBe(1);
    const products = productManager.getProducts();
    expect(products.length).toBe(1);
    expect(products[0]).toEqual(addedProduct);
  });

  test('Se llamará al método "getProducts" nuevamente, esta vez debe aparecer el producto recién agregado', () => {
    const product = {
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    };
    productManager.addProduct(product);
    const products = productManager.getProducts();
    expect(products.length).toBe(1);
    expect(products[0].title).toBe(product.title);
  });

  test('Se llamará al método "getProductById" y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.', () => {
    const product = productManager.addProduct({
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    });
    expect(productManager.getProductById(product.id)).toEqual(product);
    expect(() => productManager.getProductById(999)).toThrowError(
      'Producto con id no inexistente'
    );
  });

  test('Se llamará al método "updateProduct" y se evaluará que no se elimine el id y que sí se haya hecho la actualización.', () => {
    const product = productManager.addProduct({
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    });
    const updatedProduct = productManager.updateProduct(product.id, {
      price: 300,
    });
    expect(updatedProduct.id).toBe(product.id);
    expect(updatedProduct.price).toBe(300);
    const products = productManager.getProducts();
    expect(products.length).toBe(1);
    expect(products[0].price).toBe(300);
  });

  test('Se llamará al método "deleteProduct" y se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.', () => {
    const product = productManager.addProduct({
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    });
    productManager.deleteProduct(product.id);
    expect(productManager.getProducts().length).toBe(0);
    expect(() => productManager.deleteProduct(999)).toThrowError(
      'No se puede eliminar un producto con un id que no existe'
    );
  });

  afterAll(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
});
