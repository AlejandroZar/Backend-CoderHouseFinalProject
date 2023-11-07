const fs = require('fs');
const Product = require('../models/Product');

// Ruta: GET /api/products
function getProducts(req, res) {
  try {
    const products = JSON.parse(fs.readFileSync('./data/productos.json', 'utf-8'));
    const limit = req.query.limit;
    
    if (limit) {
      res.json({ products: products.slice(0, limit) });
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

// Ruta: GET /api/products/:pid
function getProductById(req, res) {
  const productId = parseInt(req.params.pid, 10);

  if (isNaN(productId)) {
    res.status(400).json({ error: 'El ID del producto debe ser un número válido' });
    return;
  }

  try {
    const products = JSON.parse(fs.readFileSync('./data/productos.json', 'utf-8'));
    const product = products.find(p => p.id === productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

// Ruta: POST /api/products
function addProduct(req, res) {
  const productData = req.body;
  const products = JSON.parse(fs.readFileSync('./data/productos.json', 'utf-8'));

  const existingProduct = products.find(p => p.code === productData.code);
  if (existingProduct) {
    res.status(400).json({ error: 'Ya existe un producto con el mismo código' });
    return;
  }

  const newProduct = new Product(
    Date.now().toString(), // Genera un ID único basado en la marca de tiempo
    productData.title,
    productData.description,
    productData.code,
    productData.price,
    productData.status || true,
    productData.stock,
    productData.category,
    productData.thumbnails || []
  );

  products.push(newProduct);

  try {
    fs.writeFileSync('./data/productos.json', JSON.stringify(products, null, 2), 'utf-8');
    res.json({ message: 'Producto agregado con éxito', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
}

// Ruta: PUT /api/products/:pid
function updateProduct(req, res) {
  const productId = parseInt(req.params.pid, 10);
  const updatedData = req.body;

  if (isNaN(productId)) {
    res.status(400).json({ error: 'El ID del producto debe ser un número válido' });
    return;
  }

  const products = JSON.parse(fs.readFileSync('./data/productos.json', 'utf-8'));
  const existingProductIndex = products.findIndex(p => p.id === productId);

  if (existingProductIndex === -1) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  const updatedProduct = { id: productId, ...updatedData };
  products[existingProductIndex] = updatedProduct;

  try {
    fs.writeFileSync('./data/productos.json', JSON.stringify(products, null, 2), 'utf-8');
    res.json({ message: 'Producto actualizado con éxito', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

// Ruta: DELETE /api/products/:pid
function deleteProduct(req, res) {
  const productId = parseInt(req.params.pid, 10);

  if (isNaN(productId)) {
    res.status(400).json({ error: 'El ID del producto debe ser un número válido' });
    return;
  }

  const products = JSON.parse(fs.readFileSync('./data/productos.json', 'utf-8'));
  const existingProductIndex = products.findIndex(p => p.id === productId);

  if (existingProductIndex === -1) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  products.splice(existingProductIndex, 1);

  try {
    fs.writeFileSync('./data/productos.json', JSON.stringify(products, null, 2), 'utf-8');
    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};

