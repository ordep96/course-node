// ======================
// Modelo de Categoria
//=======================

const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
      Schema = mongoose.Schema;

let CategoriaSchema = new Schema({
   descripcion:{
     type:String,
     unique:true,
     required:[true,'La Descripcion es Obligatoria']
   },
   usuario:{
     type:Schema.Types.ObjectId,
     ref:'Usuario'
   }
});

CategoriaSchema.plugin( uniqueValidator, { message:'{PATH} debe ser único'})

module.exports = mongoose.model('Categoria',CategoriaSchema);
