const { io } = require('../server');

//  saber cuando alguien se conecta
io.on('connection', (client) => {
    console.log('usuario Conectado')

    client.emit('enviarMensaje',{
      usuario:'Admin',
      message:'Bienvenido a esta aplicación'
    })

    client.on('disconnect', () => {
      console.log('usuario desconectado')
    })

    // Escuchar el cliente
    client.on('enviarMensaje', (data,callback) =>{
        console.log(data)

        client.broadcast.emit('enviarMensaje',data);

        //
        // if(mensaje.usuario){
        //   callback({
        //     resp:'Todo Salio bien'
        //   });
        // }else{
        //   callback({
        //     res:'Todo Salio Mal !!!!!!'
        //   })
        // }


    });


});
