const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator');

let rolesValidados = {
  values:['ADMIN_ROLE','USER_ROLE'],
  message:'{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema,
    usuarioSchema = new Schema({
      nombre:{
        type:String,
        required:[true, 'El nombre es necesario'],
      },
      email:{
        type:String,
        required:[true,'El correo es necesario'],
        unique:true
      },
      password:{
        type:String,
        required:[true,'La contraseña es Obligatoria']
      },
      img:{
        type:String
      },
      role:{
        type:String,
        default:'USER_ROLE',
        required:true,
        enum:rolesValidados
      },
      estado:{
        type:Boolean,
        default:true
      },
      google:{
        type:Boolean,
        default:false
      }
    });

//  En esta parte nos aseguramos que por pantalla no salga la contrasña del usuario
usuarioSchema.methods.toJSON = function(){
  let user = this,
      userObject = user.toObject();
      delete userObject.password;

  return userObject;
}

usuarioSchema.plugin( uniqueValidator, { message:'{PATH} debe ser único'})

module.exports = mongoose.model('Usuario', usuarioSchema)
