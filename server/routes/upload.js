// ======================
// Upload
//=======================

const express = require('express'),
    fileUpload = require('express-fileupload'),
    fs = require('fs'),
    path = require('path'),
    app = express();

const Usuario = require('../models/usuario'),
      Producto = require('../models/producto');

// default Options
app.use(fileUpload())


app.put('/upload/:tipo/:id', (req,res) => {

  let tipo = req.params.tipo,
      id = req.params.id;

  if(!req.files){
    return res.status(400).json({
      ok:false,
      err:{
        message:'No se ha seleccionado ningun archivo'
      }
    })
  }

  // Validar tipo
  let tiposValidos = ['productos','usuarios'];

  if(tiposValidos.indexOf(tipo) < 0){
    return res.status(400).json({
      ok:false,
      err:{
        message:`Los tipos permitidos son ${tiposValidos.join(', ')}`
      }
    })
  }


    let archivo = req.files.archivo,
        nombreCortado = archivo.name.split('.'),
        extension = nombreCortado[nombreCortado.length - 1];

    //  Extensiones permitidas
    let extensionesValidas = ['png','jpg','gif','jpeg'];

    if(extensionesValidas.indexOf(extension) < 0){
      res.status(400).json({
        ok:false,
        err:{
          message:`las extensiones permitidas son ${extensionesValidas.join(', ')}`,
          ext:extension
        }
      })
    }


    // Cambiar nombre el nombre al archivo
    let nombreArchivo = `${id}-${ new Date().getMilliseconds() }.${extension}`

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
      if (err){
          return res.status(500).json({
            ok:false,
            err
          });
      }

      // aqui imagen cargada
      if(tipo === 'usuarios'){
        imagenUsuario(id,res,nombreArchivo);
      }

      if(tipo === 'productos'){
        imagenProducto(id,res,nombreArchivo);
      }



    });
});


const imagenUsuario = (id,res,nombreArchivo) => {
    Usuario.findById(id,(err,usuario) => {
      if(err){
        borraArchivo(nombreArchivo,'usuarios')
        return res.status(500).json({
          ok:false,
          err
        })
      }

      if(!usuario){
        borraArchivo(nombreArchivo,'usuarios')
        return res.status(400).json({
          ok:false,
          err:{
            message:'El usuario no existe'
          }
        })
      }


      borraArchivo(usuario.img,'usuarios')

      usuario.img = nombreArchivo;

      usuario.save((err,usuarioGuardado) => {
        res.json({
          ok:true,
          usuario:usuarioGuardado,
          img:nombreArchivo
        })
      })



    });
}

const imagenProducto = (id,res,nombreArchivo) => {
  Producto.findById(id,(err,producto) => {
    if(err){
      borraArchivo(nombreArchivo,'productos')
      return res.status(500).json({
        ok:false,
        err
      })
    }

    if(!producto){
      borraArchivo(nombreArchivo,'productos')
      return res.status(400).json({
        ok:false,
        err:{
          message:'El producto no existe'
        }
      })
    }


    borraArchivo(producto.img,'productos')

    producto.img = nombreArchivo;

    producto.save((err,productoGuardado) => {
      res.json({
        ok:true,
        producto:productoGuardado,
        img:nombreArchivo
      })
    })

  });
}


const borraArchivo = (nombreImagen,tipo,) => {
  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
  if(fs.existsSync(pathImagen)){
    fs.unlinkSync(pathImagen);
  }
}



module.exports = app;
