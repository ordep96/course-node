const express = require('express')
      path = require('path'),
      app = express(),
      publicPath = path.resolve(__dirname, '../public'),
      port = process.env.PORT || 3000,
      socketIO = require('socket.io'),
      http = require('http');

// asignamos el servidor a socket.io
let server = http.createServer(app);

// Mantiene la comunicación del backend
module.exports = { io :socketIO(server) };
require('./sockets/socket');

app.use(express.static(publicPath));


server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});
