const express = require('express'),
      app = express(),
      { verificaToken } = require('../middlewares/autenticacion'),
      Producto = require('../models/producto');


// ======================
// Obtener todos los productos
//=======================

app.get('/productos', verificaToken, (req,res) => {
    //  trae todos los productos
    // populate: usuariio categoria
    // paginado
    let desde = req.query.desde || 0;
        desde = Number(desde);
    Producto.find({disponible:true})
      .skip(desde)
      .limit(5)
      .populate('usuario','nombre email')
      .populate('categoria','descripcion')
      .exec((err,productos) => {
        if(err){
          res.status(400).json({
            ok:false,
            err
          })
        }

        res.json({
          ok:true,
          productos
        })

      })
});

// ======================
// Obtener un producto por id
//=======================
app.get('/productos/:id', verificaToken, (req,res) => {
    // populate: usuariio categoria
    // paginado
    let id = req.params.id;

    Producto.findById(id)
      .populate('usuario','nombre email')
      .populate('categoria','descripcion')
      .exec((err,producto) => {
        if(err){
          res.status(400).json({
            ok:false,
            err
          })
        }

        res.json({
          ok:true,
          producto
        })
      })
});


// ======================
// Buscar Producto
//=======================
app.get('/productos/buscar/:termino', verificaToken, (req,res) => {

  let termino = req.params.termino;

  let regex = new RegExp(termino,'i');

  Producto.find({nombre:regex})
    .populate('categoria', 'nombre')
    .exec((err,productos) => {
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }

      res.json({
        ok:true,
        productos
      })

    })

});


// ======================
// Crear un nuevo producto
//=======================
app.post('/productos', verificaToken, (req,res) => {
    //grabar el usuario
    // grabar un categoria
    let producto = {
      nombre:req.body.nombre,
      precioUni:req.body.precioUni,
      descripcion:req.body.descripcion,
      categoria:req.body.categoria,
      usuario:req.usuario._id
    }

    Producto.create(producto,(err,producto) => {
      if(err){
        res.status(500).json({
          ok:false,
          err
        })
      }

      res.status(201).json({
        ok:true,
        message:'Producto agregado Correctamente',
        producto
      })

    })
});

// ======================
// actuzalizar producto
//=======================
app.put('/productos/:id', (req,res) => {
    //grabar el usuario
    // grabar un categoria
    let id = req.params.id,
        producto = req.body,
        opts = {
          new:true,
          runValidators:true
        }

    Producto.findByIdAndUpdate(id,producto,opts,(err,productoUpdated) => {
      if(err){
        res.status(400).json({
          ok:false,
          err
        })
      }

      res.json({
        ok:true,
        message:'Producto Actualizado',
        productoUpdated
      })

    })
});

// ======================
// Eliminar un producto
//=======================
app.delete('/productos/:id', (req,res) => {

  let id = req.params.id;

  Producto.findByIdAndUpdate(id,{disponible:false},(err,producto) => {
    if(err){
      res.status(400).json({
        ok:false,
        err
      })
    }

    if(!producto){
      res.status(400).json({
        ok:false,
        err:{
          message:'Producto no encontrado'
        }
      })
    }

    res.json({
      ok:true,
      message:'Producto eliminado'
    })

  })

});

module.exports = app;
