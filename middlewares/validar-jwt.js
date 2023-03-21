const { verificarExpJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');


const validarJWT = async (req,res,next) => {
    //leer el token
const token = req.params.token;
if(!token){
    res.status(404).json({
        ok: false,
        msg: "No hay token de autenticacion!!"
    })
}

try {
    //const usuarioBD = Usuario.findOne()
    const usuariosBD = await Usuario.find({}, 'nombre email');
    const usuariosToken = await Usuario.find({}, 'token');

    //Si hay token validamos que no este expirado
    const tokenVerificacion = await verificarExpJWT(token);
    console.log("token verificacion =", tokenVerificacion);
/*     if(!tokenVerificacion){
        res.status(401).json({
            ok: false,
            msg: "Token incorrecto !!"
        })
    } */

    res.json({
        ok:true,
        token
    })
} catch (error) {
    console.log(error);
    res.status(401).json({
        ok: false,
        msg: "Token incorrecto !!"
    })
}

next();
}

module.exports = {
    validarJWT
}