const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const createCompanyRouter = (companyController) => {
    const router = express.Router();

    router.post('/', (req, res) => companyController.create(req, res));
    router.get('/:id', authMiddleware, (req, res) => companyController.getById(req, res));
    router.get('/', authMiddleware, (req, res) => companyController.getAll(req, res));
    router.get('/filter', authMiddleware, (req, res) => companyController.findByFilter(req, res));
    router.put('/:id', authMiddleware, (req, res) => companyController.update(req, res));
    router.delete('/:id', authMiddleware, (req, res) => companyController.delete(req, res));
    router.get('/:companyId/invite', authMiddleware, (req, res) => companyController.getToken(req, res));

    return router;
};

module.exports = createCompanyRouter;
