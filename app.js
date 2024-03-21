// Importar los módulos necesarios
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

// Crear la aplicación de Express y el servidor HTTP
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la vista en tiempo real
app.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', { pageTitle: 'Real-Time Products' });
});

// Configurar el servidor para escuchar en el puerto 8080
const port = 8080;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Manejar la conexión de los clientes
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Emitir un evento con un objeto desde el servidor
  const nuevoProducto = {
    id: 1,
    nombre: 'Cables',
    precio: 10.99,
    categoria: 'Electrónicos'
  };

  // Emitir el evento 'nuevoProducto' con el objeto nuevoProducto
  socket.emit('nuevoProducto', nuevoProducto);

  // Emitir un evento con un array desde el servidor
  const productos = [
    { id: 1, nombre: 'Mouse', precio: 19.99 },
    { id: 2, nombre: 'Teclado', precio: 24.99 },
    { id: 3, nombre: 'MousePad', precio: 14.99 }
  ];

  // Emitir el evento 'productosNuevos' con el array productos
  socket.emit('productosNuevos', productos);
});
