import ProductManager from '../dao//productManager.js';

const productManager = new ProductManager();

export const getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts(limit);
  res.render('products', { products });
};

export const getProductById = async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = await productManager.getProductById(pid);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      error: 'Producto no encontrado',
    });
  }
  res.json({ product });
};

export const addProduct = async (req, res) => {
  const product = req.body;
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.code ||
    !product.stock ||
    !product.category
  ) {
    return res.status(400).json({
      status: 'error',
      error: 'Datos de producto incompletos',
    });
  }
  const newProduct = await productManager.addProduct(product);
  res.status(201).json({
    status: 'success',
    message: 'Producto creado correctamente',
    product: newProduct,
  });
};

export const updateProduct = async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = req.body;
  const existingProduct = await productManager.getProductById(pid);
  if (!existingProduct) {
    return res.status(404).json({
      status: 'error',
      error: `Producto con el ID:${pid} no encontrado`,
    });
  }
  const updatedProduct = await productManager.updateProduct(pid, product);
  res.json({ updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = await productManager.deleteProduct(pid);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      error: 'Producto no encontrado',
    });
  }
  res.json({ status: 'success', message: 'Producto eliminado correctamente' });
};

export const deleteAllProducts = async (req, res) => {
  await productManager.deleteAllProducts();
  res.json({
    status: 'success',
    message: 'Todos los productos han sido eliminados',
  });
};

export const getHome = async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
};

export const getRealTimeProducts = async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
};
