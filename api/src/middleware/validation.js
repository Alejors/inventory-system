const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('sku')
        .isString().withMessage('SKU debe ser un texto')
        .notEmpty().withMessage('SKU es obligatorio'),
    body('name')
        .isString().withMessage('Nombre debe ser un texto')
        .notEmpty().withMessage('Nombre es obligatorio'),
    body('description')
        .optional()
        .isString().withMessage('Descripción debe ser un texto'),
    body('categoryId')
        .isInt().withMessage('ID de categoría debe ser el número de una categoría')
        .notEmpty().withMessage('ID de categoría es obligatorio'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

const validateUser = [
    body('username')
      .notEmpty().withMessage('El nombre de usuario es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres.')
      .isAlphanumeric().withMessage('El nombre de usuario solo puede contener letras y números.'),
    
    body('email')
      .notEmpty().withMessage('El correo electrónico es obligatorio.')
      .isEmail().withMessage('El formato del correo electrónico no es válido.')
      .normalizeEmail(),
    
    body('password')
      .notEmpty().withMessage('La contraseña es obligatoria.')
      .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    
    body('role')
      .notEmpty().withMessage('El rol es obligatorio.')
      .isIn(['admin', 'manager', 'user']).withMessage('El rol debe ser uno de los siguientes: admin, manager, user.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

const validateLocation = [
    body('name')
        .notEmpty().withMessage('El nombre de la ubicación es obligatorio.')
        .isString().withMessage('El nombre debe ser un texto.'),
    body('address')
        .notEmpty().withMessage('La dirección es obligatoria.')
        .isString().withMessage('La dirección debe ser un texto.'),
    body('type')
        .notEmpty().withMessage('El tipo de ubicación es obligatorio.')
        .isIn(['warehouse', 'store', 'supplier']).withMessage('El tipo debe ser uno de los siguientes: warehouse, store, supplier.'),
    body('companyId')
        .notEmpty().withMessage('El ID de la compañía es obligatorio.')
        .isInt().withMessage('El ID de la compañía debe ser un número entero.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

const validateCompany = [
    body('name')
        .notEmpty().withMessage('El nombre de la compañía es obligatorio.')
        .isString().withMessage('El nombre debe ser un texto.'),
    body('code')
        .notEmpty().withMessage('El código de la compañía es obligatorio.')
        .isString().withMessage('El código debe ser un texto.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

const validateCategory = [
    body('name')
        .notEmpty().withMessage('El nombre de la categoría es obligatorio.')
        .isString().withMessage('El nombre debe ser un texto.'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser un texto.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateProduct, validateUser, validateLocation, validateCompany, validateCategory };
