const express = require('express');
const { validateProduct } = require('../middleware/validation');
const { authMiddleware } = require('../middleware/auth');

const createProductRouter = (productController) => {
    const router = express.Router();

    router.post('/', authMiddleware, validateProduct, (req, res) => productController.createProduct(req, res));
    router.get('/', authMiddleware, (req, res) => productController.getAllProducts(req, res));
    router.get('/filter', authMiddleware, (req, res) => productController.getProductsByFilter(req, res));
    router.get('/:id', authMiddleware, (req, res) => productController.getProductById(req, res));
    router.put('/:id', authMiddleware, (req, res) => productController.updateProduct(req, res));
    router.delete('/:id', authMiddleware, (req, res) => productController.deleteProduct(req, res));

    return router;
};

module.exports = createProductRouter;
