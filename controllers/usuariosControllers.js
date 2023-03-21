const Usuario = require('../models/usuario');
const { response } = require('express');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email');
    res.json({
        ok: true,
        usuarios,
        uid:req.uid
    })
};

const creandoUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado."
            });
        }
        // Instancia de mi clase
        const usuario = new Usuario(req.body);

        //Encriptar password.
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        const token = await generarJWT(usuario.id);
        await usuario.save();
        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar logs"
        })
    }

};

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            })
        }

        // Actualizaciones requeridas.
        //const campos = req.body;
        //delete campos.password;
        //delete campos.google;

        const { password, google, email, ...campos } = req.body;

/*         if (usuarioDB.email !== email) { */
            //un correo electronico que ya existe en la bd
            const existeEmail = await Usuario.findOne({ email }); //verificacion del email
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email!!!"
                })
            }
/*         } */

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true }); // Para que regrese el nuevo resultado.. , {new:true}

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error en la actualizacion"
        })
    }
};

const borrarUsuario = async (req, res) => {
    console.log("borrando usuario - ", req);
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: "No existe un usuario con ese id!!"
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            uid
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error en la eliminacion !!"
        })
    }
};

module.exports = {
    getUsuarios,
    creandoUsuario,
    actualizarUsuario,
    borrarUsuario
}