const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Pet = require('../models/pet');

const petGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, pets] = await Promise.all([
        Pet.countDocuments(query),
        Pet.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        pets
    });
} 

const getPetByid = async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findOne({_id: id});

    res.status(200).json({
        pet
    });
}

const petPut = async (req, res) => {
    const { id } = req.params;
    const { _id, especie, adoptado, ...resto} = req.body;

    await Pet.findByIdAndUpdate(id, resto);

    const pet = await Pet.findOne({_id: id});

    res.status(200).json({
        msg: 'Mascota Actualizado exitosamente',
        pet
    })
}

const petDelete = async (req, res) => {
    const {id} = req.params;
    await Pet.findByIdAndUpdate(id,{estado: false});

    const pet = await Pet.findOne({_id: id});

    res.status(200).json({
        msg: 'La mascota eliminada exitosamente',
        usuario
    });
}

const petsPost = async (req, res) =>{
    const { especie, razaMascota, edadMascota, adoptado } = req.body;
    const usuario = new Usuario({especie, razaMascota, edadMascota, adoptado});
    
    await pet.save();
    res.status(200).json({
        pet
    });
}

module.exports = {
    petDelete,
    petsPost,
    petGet,
    getPetByid,
    petPut
}