const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // Manejo de mensajes normales
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  // FUNCIONES DE ADMIN
  socket.on('admin command', (data) => {
    // Verificamos el código aquí también por seguridad
    if (data.key === "admin777") {
      if (data.action === "clear") {
        io.emit('admin control', { type: 'clear' });
      }
      if (data.action === "ban") {
        // Enviamos la orden de cerrar conexión a un usuario específico
        io.emit('admin control', { type: 'ban', target: data.target });
      }
    }
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log('Servidor de Admin activo');
});
