
// ================
// Verificar Token
//====================
const jwt = require('jsonwebtoken');


// middleware para verificar el token
const verificaToken = (req,res,next) => {

  // OBTENER EL HEADER DE LA PETICION
  let token = req.get('token');

  // verificar que el token sea valido
  jwt.verify(token, process.env.SEED, (err,decoded) => {
      if(err){
        return res.status(401).json({
          ok:false,
          err
        })
      }

      req.usuario = decoded.usuario;
      next();

  })
};


// ================
// Verificar Admin Role
//====================
const verificaAdminRole = (req,res,next) => {

  let usuario = req.usuario;
  if(usuario.role === 'ADMIN_ROLE'){
    next()
  }else{
    res.json({
      ok:false,
      message:'Usuario no es Administrador'
    })
  }
}


module.exports = {
  verificaToken,
  verificaAdminRole
}
