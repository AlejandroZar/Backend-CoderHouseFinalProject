const fs = require('fs');
const Cart = require('../models/Carts');

// Ruta: POST /api/carts
function createCart(req, res) {
  const newCart = new Cart(Date.now().toString());

  try {
    const carts = JSON.parse(fs.readFileSync('./data/carts.json', 'utf-8'));
    carts.push(newCart);
    fs.writeFileSync('./data/carts.json', JSON.stringify(carts, null, 2), 'utf-8');
    res.json({ message: 'Carrito creado con éxito', cart: newCart });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
}

// Ruta: GET /api/carts/:cid
function getCartProducts(req, res) {
  const cartId = req.params.cid;

  try {
    const carts = JSON.parse(fs.readFileSync('./data/carts.json', 'utf-8'));
    const cart = carts.find(c => c.id === cartId);

    if (cart) {
      res.json({ products: cart.products });
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}

// Ruta: POST /api/carts/:cid/product/:pid
function addProductToCart(req, res) {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid, 10);
  const quantity = req.body.quantity || 1;

  if (isNaN(productId)) {
    res.status(400).json({ error: 'El ID del producto debe ser un número válido' });
    return;
  }

  try {
    const carts = JSON.parse(fs.readFileSync('./data/carts.json', 'utf-8'));
    const cart = carts.find(c => c.id === cartId);

    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
    const product = products.find(p => p.id === productId);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const existingProduct = cart.products.find(p => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    fs.writeFileSync('./data/carts.json', JSON.stringify(carts, null, 2), 'utf-8');
    res.json({ message: 'Producto agregado al carrito con éxito', product: product, quantity: quantity });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
}

module.exports = {
  createCart,
  getCartProducts,
  addProductToCart
};
