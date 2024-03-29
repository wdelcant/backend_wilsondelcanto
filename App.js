const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const productManager = new ProductManager('./products.json');

app.use(express.json());

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
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
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json({ product });
});

app.post('/products', async (req, res) => {
  const product = req.body;
  await productManager.addProduct(product);
  res.status(201).json({ message: 'Producto agregado correctamente' });
});

app.put('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const product = req.body;
  const existingProduct = await productManager.getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  await productManager.updateProduct(id, product);
  res.json({ message: 'Producto actualizado correctamente' });
});

app.delete('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const existingProduct = await productManager.getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  await productManager.deleteProduct(id);
  res.json({ message: 'Producto eliminado correctamente' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Welcome! Your server running on port ${PORT}`)
);
