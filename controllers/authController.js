const { response } = require("express");
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const bcryptjs = require('bcryptjs');



const login = async (req, res = response) => {

    const { email, password } = req.body;


    try {
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña o email no son validos'
            })
        }

        console.log("contraseña", password);
        console.log("usuarioDB.password", usuarioDB.password);
        
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if (!validPassword){
            return res.status(404).json({
                ok:false,
                msg: 'La contraseña no es valida'
            })
        }

        //Generar nuevo TOKEN -JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}

module.exports = {
    login
}