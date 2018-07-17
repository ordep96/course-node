

const express = require('express'),
      Usuario = require('../models/usuario'),
      bcrypt = require('bcrypt'),
      _ = require('underscore'),
      { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion'),
      app = express();


app.get('/usuario', verificaToken, (req,res) => {

  let desde = req.query.desde || 0;
  desde = Number(desde)

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({estado:true},'nombre email role estado google img')
    // Limite para obtener datos
    .skip(desde)
    .limit(limite)
    .exec((err,usuarios) => {

      if(err){
        res.status(400).json({
          ok:false,
          err
        })
      }

      Usuario.count({estado:true}, (err,conteo) => {
          res.json({
            ok:true,
            usuarios,
            conteo
          })

      })


    })
  // res.json('get Usuarios');
});


app.post('/usuario', [verificaToken,verificaAdminRole], (req,res) => {
  let body = req.body,
      usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        role:body.role
      })


  usuario.save((err,usuarioDB) => {
    if(err) {
      return res.status(400).json({
        ok:false,
        err
      })
    }

    /*usuarioDB.password = null;*/

    res.json({
      ok:true,
      usuario:usuarioDB
    })

  })
});


app.put('/usuario/:id', verificaToken, (req,res) => {

  let id = req.params.id,
      body = _.pick(req.body, ['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id, body,{ new:true, runValidators:true }, (err,usuarioDB) => {

       if(err){
         return res.status(400).json({
           ok:false,
           err
         })
       }

       res.json({
         ok:true,
         usuarioDB
       })

    })

    /* res.json({
      message:"Actualizacion Usuario",
      id:id
    }); */
});


app.delete('/usuario/:id', verificaToken, (req,res) => {
   let id = req.params.id;

   Usuario.findByIdAndUpdate(id, {estado:false},(err,usuarioBorrado) => {
      if(err){
          return res.status(400).json({
          ok:false,
          err
        })
      }

      res.json({
        ok:true,
        usuarioBorrado
      })
   })
});


module.exports = app;
