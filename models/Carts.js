class Cart {
    constructor() {
      this.id = this.generateUniqueId();
      this.products = [];
    }
  
    generateUniqueId() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let id = '';
      for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * chars.length);
        id += chars.charAt(index);
      }
      return id;
    }
  
    addProduct(productId, quantity = 1) {
      const existingProduct = this.products.find((product) => product.productId === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.products.push({ productId, quantity });
      }
    }
  
    removeProduct(productId, quantity = 1) {
      const existingProduct = this.products.find((product) => product.productId === productId);
      if (existingProduct) {
        existingProduct.quantity -= quantity;
        if (existingProduct.quantity <= 0) {
          const index = this.products.indexOf(existingProduct);
          this.products.splice(index, 1);
        }
      }
    }
  
    getProducts() {
      return this.products;
    }
  }
  
  module.exports = Cart;
  