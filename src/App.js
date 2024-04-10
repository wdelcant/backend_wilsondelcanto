import express from 'express';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { errorHandler, requestLogger } from './middlewares/errorHandler.js';
import { __dirname } from './utilsPath.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(requestLogger);

app.listen(PORT, error => {
  if (error) {
    console.log(error);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
