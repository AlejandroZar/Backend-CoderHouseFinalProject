const express = require('express');
const router = express.Router();
const ProductManager = require('../models/ProductManager');

// Configura una instancia de ProductManager
const manager = new ProductManager('data/products.json');

// Ruta para listar todos los productos
router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await manager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json({ products: limitedProducts });
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

module.exports = router;

