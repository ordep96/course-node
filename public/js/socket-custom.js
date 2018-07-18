
let button = document.getElementById("mensaje");
const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
  console.log('desconectado del servidor');
})

// Los emits para enviar información
socket.emit('enviarMensaje', {
  usuario:'Fernando',
  mensaje:'Hola Mundo'
}, (resp) => {
  console.log(resp)

})

socket.on('enviarMensaje', (mensaje) => {
  console.log(mensaje)
})
