require('./config/config');

const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      routes = require(`${__dirname}/routes/index`),
      path = require('path');
      app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Habilitar carpeta publi
app.use(express.static(path.resolve(__dirname ,'../public')));

// Configuración global de rutas
app.use(routes);

mongoose.connect(process.env.URLDB,
{
  useNewUrlParser:true
}, (err) => {
  if(err) throw err;
  console.log("corriendo Base de Datos")
});


app.listen(process.env.PORT, () => console.log("corriendo servidor en servidor 3000"));


module.exports = app;
