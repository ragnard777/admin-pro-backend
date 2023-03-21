const { response } = require('express');
const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                console.log("No se pudo generar el JWT");
            }else{
                resolve(token);
            }
        });
    });
}

const verificarExpJWT = async(req,res = response,next) =>{
    console.log(" request token =", req);
    const resultado = await jwt.verify(req, process.env.URL);
    return resultado;
}

module.exports = {
    generarJWT,
    verificarExpJWT
}