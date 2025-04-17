const express = require('express');
const { authMiddleware } = require('../middleware/auth'); // Importar el middleware de autenticación

const createCategoryRouter = (categoryController) => {
    const router = express.Router();

    router.post('/', authMiddleware, (req, res) => categoryController.createCategory(req, res));
    router.get('/', authMiddleware, (req, res) => categoryController.getCategories(req, res));
    router.get('/filter', authMiddleware, (req, res) => categoryController.getCategoriesByFilter(req, res));
    router.put('/:id', authMiddleware, (req, res) => categoryController.updateCategory(req, res));
    router.delete('/:id', authMiddleware, (req, res) => categoryController.deleteCategory(req, res));

    return router;
};

module.exports = createCategoryRouter;
