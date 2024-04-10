import ProductManager from '../models/productModel.js';

const productManager = new ProductManager('./products.json');

export const getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts(limit);
  res.json({ products });
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
      error: 'Todos los campos son obligatorios, a excepción de thumbnails',
    });
  }
  await productManager.addProduct(product);
  res.status(201).json({
    status: 'success',
    message: 'Producto agregado correctamente',
    payload: product,
  });
};

export const updateProduct = async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = req.body;
  const existingProduct = await productManager.getProductById(pid);
  if (!existingProduct) {
    return res.status(404).json({
      status: 'error',
      error: `No se puede actualizar un producto con el ID:${pid} que no existe`,
    });
  }
  const updatedProduct = await productManager.updateProduct(pid, product);
  res.json({ updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const pid = parseInt(req.params.pid);
  const existingProduct = await productManager.getProductById(pid);
  if (!existingProduct) {
    return res.status(404).json({
      status: 'error',
      error: `No se puede eliminar un producto con el ID:${pid} que no existe`,
    });
  }
  await productManager.deleteProduct(pid);
  res.json({
    status: 'success',
    message: 'Producto eliminado correctamente',
  });
};

export const deleteAllProducts = async (req, res) => {
  await productManager.deleteAllProducts();
  res.json({
    status: 'success',
    message: 'Todos los productos han sido eliminados',
  });
};
