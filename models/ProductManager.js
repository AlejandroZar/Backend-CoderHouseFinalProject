const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct(productData) {
    const product = {
      id: this.getNextProductId(),
      ...productData,
    };
    this.products.push(product);
    this.saveProducts();
    return product;
  }

  getNextProductId() {
    const ids = this.products.map(product => product.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  updateProduct(productId, updatedData) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products[index] = { id: productId, ...updatedData };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
