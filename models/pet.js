const { Schema, model} = require('mongoose');

const PetSchema = Schema ({
    especie: {
        type: String,
        required: [true, 'la especie del animal es obligatoria']
    },
    razaMascota: {
        type: String,
        required: [true, 'La raza de la mascota es obligatoria']
    },
    edadMascota: {
        type: String,
        required: [true, 'La edad de la mascota es obligatoria']
    },
    adoptado: {
        type: String,
        required: true,
        enum: ["ADOPTADO", "NO_ADOPTADO"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Pet', PetSchema);