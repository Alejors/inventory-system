const ConstraintError = require('../errors/constraintError');
const LocationDTO = require('../dtos/locationDTO');
class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }

    async create(req, res) {
        const locationDTO = LocationDTO.fromObject(req.body);
        try {
            const user = req.user;
            const location = await this.locationService.create(locationDTO, user);
            return res.status(201).json(location);
        } catch (error) {
            if (error instanceof ConstraintError) {
                return res.status(409).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            const location = await this.locationService.findById(id, user);
            if (!location) {
                return res.status(404).json({ message: 'Ubicación no encontrada' });
            }
            return res.status(200).json(location);
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async findAll(req, res) {
        try {
            const user = req.user;
            const locations = await this.locationService.findAll(user);
            return res.status(200).json(locations);
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const locationData = req.body;
            const user = req.user;
            const updatedLocation = await this.locationService.update(id, locationData, user);
            if (!updatedLocation) {
                return res.status(404).json({ message: 'Ubicación no encontrada' });
            }
            return res.status(200).json(updatedLocation);
        } catch (error) {
            if (error instanceof ConstraintError) {
                return res.status(409).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            await this.locationService.delete(id, user);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

module.exports = LocationController;
