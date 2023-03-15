const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    //cadena de conexion a la base de datos.
    try{
        await mongoose.connect(process.env.URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("DB online");
    } catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos, ver logs');
    }
}

module.exports = {
    dbConnection
}

