const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {existePetById} = require('../helpers/db-validators');

const { getPetByid, petGet, petPut, petsPost, petDelete } = require('../controllers/pet.controller');

const router = Router();

router.get("/", petGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existePetById),
        validarCampos
    ], getPetByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existePetById),
        validarCampos
    ], petPut);

router.delete(
        "/:id",
        [
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existePetById),
            validarCampos
        ], petDelete);

        
router.post(
    "/", 
    [
        check("especie","La especie es obligatorio").not().isEmpty(),
        check("razaMascota","La raza es obligatorio").not().isEmpty(),
        check("edadMascota","Es obligatoria la edad").not().isEmpty(),
        check("adoptado").not().isEmpty(),
        validarCampos,
    ], petsPost); 

module.exports = router;