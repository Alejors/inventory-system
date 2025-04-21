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

module.exports = { validateProduct };
