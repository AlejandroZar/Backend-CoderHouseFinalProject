const express = require('express');
const router = express.Router();

// Ruta para la vista en tiempo real de los productos
router.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', { pageTitle: 'Real-Time Products' });
});

module.exports = router;

