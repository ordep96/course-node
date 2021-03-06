//  ============================
//  PUERTO
// ==============================
process.env.PORT = process.env.PORT || 3000


//  ============================
//  Entorno
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  ============================
//  Vencimiento del token
// ==============================
//60 segundos
// 60 minutos
process.env.CADUCIDAD_TOKEN = '48h';


//  ============================
//  Seed de autenticacion
// ==============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';




//  ============================
//  Base de datos
// ==============================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
  urlDB = 'mongodb://localhost:27017/cafe'
}else{
  urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;

// ======================
// google client
// ======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '667356404677-e02i5p7a5rl9fv4tmt6jtobnnbriqknv.apps.googleusercontent.com';
