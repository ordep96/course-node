//  ============================
//  PUERTO
// ==============================
process.env.PORT = process.env.PORT || 3000


//  ============================
//  Entorno
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//  ============================
//  Base de datos
// ==============================

let urlDB;

// if(process.env.NODE_ENV === 'dev'){
//   urlDB = 'mongodb://localhost:27017/cafe'
// }else{
  urlDB = 'mongodb://ordep96:pedro1996@ds233581.mlab.com:33581/cafe-pedro'
//}

process.env.URLDB = urlDB;
