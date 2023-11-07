const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const port = 8080;

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
