// ======================
// Ruta para servir las imagenes
//=======================

const express = require('express'),
      fs = require('fs'),
      path = require('path'),
      {verficaTokenImg} = require('../middlewares/autenticacion');
      app = express();


app.get('/imagen/:tipo/:img', verficaTokenImg, (req,res) => {

  let tipo = req.params.tipo,
      img = req.params.img;

      // let pathImg = `./uploads/${tipo}/${img}`;
      let pathImagen = path.resolve(__dirname,`../../uploads/${tipo}/${img}`)

      if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen)
      }else{
        let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg');

        res.sendFile(noImagePath);
      }

});






module.exports = app;
