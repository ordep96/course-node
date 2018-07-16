
const express = require('express'),
      app = express();

let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion'),
    Categoria = require('../models/categoria');

// ======================
//  Mostrar todas la categorias
//=======================
app.get('/categoria', verificaToken, (req,res) => {
  Categoria.find({})
    .sort('descripcion')
    .populate('usuario','nombre email')
    .exec((err, categorias) => {
    if(err){
      res.status(400).json({
        ok:false,
        err
      })
    }else{
      res.json({
        ok:true,
        categorias
      })
    }
  })
});

// ======================
// Mostrar una categoria por id
//=======================
app.get('/categoria/:id', verificaToken, (req,res) => {
    let id = req.params.id;

    Categoria.findById(id,(err,categoria) => {
      if(err){
        res.status(400).json({
          ok:true,
          err
        })
      }else{
        res.json({
          ok:true,
          categoria
        })
      }
    })
});


// ======================
// Crear nueva Categoria
//=======================
app.post('/categoria/', verificaToken, (req,res) => {
    // regresa la nueva categoria
    // req.usuario._id
    let categoria = {
      descripcion:req.body.descripcion,
      usuario:req.usuario._id
    }
    Categoria.create(categoria,(err,categoria) => {
      if(err){
        res.status(500).json({
          ok:false,
          err
        })
      }

      if(!categoria){
        res.status(400).json({
          ok:false,
          err
        })
      }

        res.json({
          ok:true,
          message:'Categoria creada exitosamente',
          categoria
        })

    })
});


// ======================
// Actualizar categoria
//=======================
app.put('/categoria/:id', verificaToken, (req,res) => {
    // regresa la nueva categoria
    let id = req.params.id,
        categoria = req.body,
        opts = {
          new:true,
          runValidators:true
        };

    Categoria.findByIdAndUpdate(id,categoria,opts,(err,categoriaUpdated) => {

        if(err){
          res.status(500).json({
            ok:false,
            err
          })
        }

        if(!categoria){
          res.status(400).json({
            ok:false,
            err
          })
        }

        res.json({
          ok:true,
          categoriaUpdated
        })
    })

});

// ======================
// Eliminar Categoria
//=======================
app.delete('/categoria/:id', [verificaToken,verificaAdminRole], (req,res) => {
    // regresa la nueva categoria
    // solo un administrar puede borrar categorias, pedir el token
    let id = req.params.id;

    Categoria.findByIdAndRemove(id,(err,categoriaDeleted) => {
      if(err){
        res.json({
          ok:false,
          err:{
            message:'Tarea no Encotrada'
          }
        })
      }else{
        res.json({
          ok:true,
          message:'Tarea Eliminada',
          categoriaDeleted
        })
      }
    })

});



module.exports = app;
