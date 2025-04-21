const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { validateLocation } = require('../middleware/validation');
const createLocationRouter = (locationController) => {
    const router = express.Router();

    router.post('/', authMiddleware, validateLocation, (req, res) => locationController.create(req, res));
    router.get('/', authMiddleware, (req, res) => locationController.findAll(req, res));
    router.get('/:id', authMiddleware, (req, res) => locationController.findById(req, res));
    router.put('/:id', authMiddleware, (req, res) => locationController.update(req, res));
    router.delete('/:id', authMiddleware, (req, res) => locationController.delete(req, res));

    return router;
};

module.exports = createLocationRouter;
