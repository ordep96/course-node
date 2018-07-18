
// ======================
// Socket nuevo Ticket
//=======================
let socket = io();

let label = $('#lblNuevoTicket')

// Cuando hay una conexión
socket.on('connect', () => {
  console.log('Conectado al servidor');
});

socket.on('estadoActual', (ticket) => {
  label.text(ticket.actual);
})

// cuando hay una desconexión
socket.on('disconnect', () => {
  console.log('Desconectado del servidor')
});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket)
    });
});
