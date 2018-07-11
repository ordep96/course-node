const express = require('express'),
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken'),
      Usuario = require('../models/usuario'),
      app = express();

app.post('/login', (req,res) => {

  let body = req.body;

  Usuario.findOne({email:body.email}, (err,usuarioDB) => {
      if(err){
        return res.status(500).json({
          ok:false,
          err
        });
      }

      if( !usuarioDB ){
        return res.status(400).json({
          ok:false,
          err:{
            message:"(Usuario) o contraseña incorrectos"
          }
        });
      }

      // Comprabar que la contraseña sea correcta
      if(!bcrypt.compareSync(body.password, usuarioDB.password)){
        return res.status(400).json({
          ok:false,
          err:{
            message:"Usuario o (contraseña) incorrectos"
          }
        });
      }


      // Generar Token
      let token = jwt.sign({
        usuario:usuarioDB
        // Experir en 30 dias
      },process.env.SEED, { expiresIn:process.env.CADUCIDAD_TOKEN})

      res.json({
        ok:true,
        usuario:usuarioDB,
        token
      })

  })

});



module.exports = app;
