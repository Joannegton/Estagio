const { check, validationResult } = require('express-validator');

const validateUser = [
    check('matricula').notEmpty().withMessage('Matrícula é obrigatória'),
    check('tipoUsuario').notEmpty().withMessage('Tipo de usuário é obrigatório'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserId = [
    check('matricula').isInt().withMessage('Matrícula deve ser um número inteiro'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUser, validateUserId };