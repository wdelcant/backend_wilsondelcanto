import CartManager from '../models/cartModel.js';

const cartManager = new CartManager('./carts.json');

export const createCart = async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json({
    status: 'success',
    message: 'Carrito creado correctamente',
    payload: cart,
  });
};

export const getCartById = async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(cid);
  if (!cart) {
    return res.status(404).json({
      status: 'error',
      error: 'Carrito no encontrado',
    });
  }
  res.json({ cart });
};

export const addProductToCart = async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const cart = await cartManager.addProductToCart(cid, pid);
  if (!cart) {
    return res.status(404).json({
      status: 'error',
      error: 'No se pudo agregar el producto al carrito',
    });
  }
  res.json({ cart });
};

export const removeProductFromCart = async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const cart = await cartManager.removeProductFromCart(cid, pid);
  if (!cart) {
    return res.status(404).json({
      status: 'error',
      error: 'No se pudo eliminar el producto del carrito',
    });
  }
  res.json({ cart });
};

export const deleteCart = async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = await cartManager.deleteCart(cid);
  if (!cart) {
    return res.status(404).json({
      status: 'error',
      error: 'No se pudo eliminar el carrito',
    });
  }
  res.json({ cart });
};
