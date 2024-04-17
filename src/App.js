import express from 'express';
import handlebars from 'express-handlebars';
import { setupSocket } from './controllers/productController.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { errorHandler, requestLogger } from './middlewares/errorHandler.js';
import { __dirname } from './utilsPath.js';
import viewsRoutes from './routes/viewsRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, error => {
  if (error) {
    console.log(error);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = setupSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  'hbs',
  handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs',
  })
);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use('/', viewsRoutes);

app.use(
  '/api/products',
  (req, res, next) => {
    req.io = io;
    next();
  },
  productRoutes
);

app.use('/api/carts', cartRoutes);
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(requestLogger);
