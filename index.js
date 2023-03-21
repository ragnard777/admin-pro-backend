const express = require('express');
require('dotenv').config();
//desestructuracion de importacion.
const { dbConnection } = require('./database/config');
//desbloquear las peticiones a diferentes dominios.
const cors = require('cors');

//Crear el servidor express... 
const app = express();

//configurar cors. que sirve para que no bloqueen las peticiones http
//el use es un middleware...
app.use(cors());

//middleware para leer el body.
app.use(express.json());

//dbconnection
dbConnection();

app.use('/api/usuarios',require('./routes/usuariosRoutes'));
app.use('/api/login',require('./routes/authRouter'));

app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en el puerto ", + process.env.PORT);
})

//console.log("Hola mundo");