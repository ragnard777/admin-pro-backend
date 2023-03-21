const {Schema, model} = require('mongoose');


//definiendo modelo en base al Schema del mongoose.
const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:true,
    }, 
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        default: 'USER_ROLE'
    },
    google:{
        type:Boolean,
        default: false
    },
    estado:{
        type:Boolean,
        default: true
    }
});

UsuarioSchema.method('toJSON',  function() {
    const {__v,_id, password, ...object } = this.toObject(); //es una configuracion global todos los usuarios van a tener esta modificacion.
    object.uid = _id;
    return object;
})

//exportar el usuario desde schema de mongoose
module.exports = model('Usuario', UsuarioSchema);