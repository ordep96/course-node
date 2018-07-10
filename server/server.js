require('./config/config');

const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



app.get('/usuario', (req,res) => {
  res.json('get Usuarios');
});


app.post('/usuario', (req,res) => {
  let body = req.body;

  if(body.nombre === undefined){
    res.status(400).json({
      ok:false,
      mensaje:"El nombre del Usuario es requerido"
    })
  }
  else{
    res.json({
      persona:body
    });

  }

});


app.put('/usuario/:id', (req,res) => {

  let id = req.params.id;

  res.json({
    message:"Actualizacion Usuario",
    id:id
  });
});


app.delete('/usuario', (req,res) => {
  res.json('delete Usuarios');
});


app.listen(process.env.PORT, () => console.log("corriendo servidor en servidor 3000"));
