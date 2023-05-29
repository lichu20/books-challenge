const { body } = require('express-validator');

let validaciones = [
    body('name').notEmpty().withMessage('el nombre no puede estar vacío'),
    body('email').notEmpty().withMessage('el email no puede estar vacío').isEmail().withMessage('El email debe ser válido'),
    body('country').notEmpty().withMessage('el país no puede estar vacío'),
    body('password').notEmpty().withMessage('la contraseña no puede estar vacía').isLength({min: 7}).withMessage('La contraseña no puede ser menor a 7 caracteres'),
    body('category').notEmpty().withMessage('Debes seleccionar una categoría'),
];

module.exports = validaciones