const { body } = require('express-validator');

let validaciones = [
    body('email').notEmpty().withMessage('el email no puede estar vacío').isEmail().withMessage('El email debe ser válido'),
    body('password').notEmpty().withMessage('la contraseña no puede estar vacía').isLength({min: 7}).withMessage('La contraseña no puede ser menor a 7 caracteres'),
];

module.exports = validaciones