const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta para la vista en tiempo real
app.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', { pageTitle: 'Real-Time Products' });
});

// Manejo de Websockets
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejo de eventos de Websockets aquí...
  socket.on('agregarProducto', (data) => {
    // Lógica para agregar el producto
    const nuevoProducto = {
      id: productos.length + 1,
      nombre: data.nombre, // Asume que la información del producto se pasa en 'data'
      // Otras propiedades del producto...
    };

    productos.push(nuevoProducto);

    // Emitir evento de actualización a través de Websockets
    io.emit('actualizarProductos', { productos });
  });
});

const port = 8080;

server.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
