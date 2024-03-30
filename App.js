import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const productManager = new ProductManager('./products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({ message: 'Bienvenido a la API de productos' });
});

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  let products = await productManager.getProducts();

  if (limit) {
    products = products.slice(0, limit);
  }

  res.json({ products });
});

app.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productManager.getProductById(id);
  if (!product) {
    return res.status(404).json({
      status: 'error',
      error: 'Producto no encontrado',
    });
  }
  res.json({ product });
});

app.post('/products', async (req, res) => {
  const product = req.body;
  await productManager.addProduct(product);
  // res.status(201).json({ message: 'Producto agregado correctamente' });
  res.status(201).json({
    status: 'success',
    message: 'Producto agregado correctamente',
    payload: product,
  });
});

app.put('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const product = req.body;
  const existingProduct = await productManager.getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({
      status: 'error',
      error: `No se puede actualizar un producto con el ID:${id} que no existe`,
    });
  }
  await productManager.updateProduct(id, product);
  res.json({ message: 'Producto actualizado correctamente', payload: product });
});

app.delete('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const existingProduct = await productManager.getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({
      status: 'error',
      error: `No se puede eliminar un producto con el ID:${id} que no existe`,
    });
  }
  await productManager.deleteProduct(id);
  res.json({
    status: 'success',
    message: 'Producto eliminado correctamente',
    payload: existingProduct,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Welcome! Your server running on port ${PORT}`)
);
