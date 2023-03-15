const express = require('express');
require('dotenv').config();
//desestructuracion de importacion.
const { dbConnection } = require('./database/config');
//desbloquear las peticiones a diferentes dominios.
const cors = require('cors');

//Crear el servidor express... 
const app = express();

//configurar cors.
//el use es un middleware...
app.use(cors());

//dbconnection
dbConnection();

console.log(process.env);

// Rutas , get,post,delete, put... etc.
app.get('/', (req, res)=>{
    res.json({
        ok:true,
        msg:'Hola mundo'
    })
    //control de errores
/*     res.status(400).json({
        ok:false,
        msg:'token erroneo'
    }) */
})


app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en el puerto ", + process.env.PORT);
})

//console.log("Hola mundo");