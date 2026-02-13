const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Un amigo se ha conectado');

  socket.on('chat message', (data) => {
    // Reenvía el mensaje a todos
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('Alguien se salió del chat');
  });
});

// IMPORTANTE: Render usa process.env.PORT
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Servidor activo en puerto: ' + PORT);
});
