let socket = io();

let searchParams = new URLSearchParams(window.location.search);


if(!searchParams.has('escritorio')){
  window.location = 'index.html';
  throw new Error('El escritorio es necesario');
}
let escritorio = searchParams.get('escritorio');
let label = $('small');

$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', () => {

  socket.emit('atenderTicket',{escritorio},(resp) => {

    label.text(resp.numero);

  });

});
