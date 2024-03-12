const ProductManager = require('./productManager');

describe('ProductManager', () => {
  let productManager;

  beforeEach(() => {
    productManager = new ProductManager();
  });

  test('getProducts debería devolver una matriz vacía en una nueva instancia', () => {
    expect(productManager.getProducts()).toEqual([]);
  });

  test('addProduct debería agregar un producto correctamente con una id única', () => {
    const product = {
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    };
    productManager.addProduct(
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock
    );
    const addedProduct = productManager.getProducts()[0];
    expect(addedProduct.id).toBe(1);
    expect(productManager.getProducts()).toContainEqual(
      expect.objectContaining(product)
    );
  });

  test('addProduct debería arrojar un error al agregar un producto con código duplicado', () => {
    const product = {
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    };
    productManager.addProduct(
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock
    );
    expect(() =>
      productManager.addProduct(
        product.title,
        product.description,
        product.price,
        product.thumbnail,
        product.code,
        product.stock
      )
    ).toThrow('Producto ya existente');
  });

  test('getProductById debería devolver un error cuando no se encuentra el producto', () => {
    const product = productManager.getProductById(999);
    expect(product).toBeUndefined();
  });

  test('getProductById debería devolver el producto cuando lo encuentre', () => {
    const product = {
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    };
    productManager.addProduct(
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock
    );
    const addedProduct = productManager.getProducts()[0];
    expect(productManager.getProductById(addedProduct.id)).toEqual(
      expect.objectContaining(product)
    );
  });
});
