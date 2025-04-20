const LocationModel = require('../models/location');
const ILocationRepository = require('../interfaces/ILocationRepository');
const ConstraintError = require('../errors/constraintError');
const LocationEntity = require('../entities/location');

class LocationRepository extends ILocationRepository {
    async create(locationData) {
        try {
            const location = await LocationModel.create(locationData);
            return new LocationEntity(location.toJSON());
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
                throw new ConstraintError('Error de restricción: ' + error.message);
            }
            throw error;
        }
    }

    async findById(id) {
        const location = await LocationModel.findByPk(id);
        return location ? new LocationEntity(location.toJSON()) : null;
    }

    async findAll() {
        const locations = await LocationModel.findAll();
        return locations.map(loc => new LocationEntity(loc.toJSON()));
    }

    async update(id, locationData) {
        try {
            const [updated] = await LocationModel.update(locationData, {
                where: { id }
            });
            return updated ? this.findById(id) : null;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
                throw new ConstraintError('Error de restricción: ' + error.message);
            }
            throw error;
        }
    }

    async delete(id) {
        try {
            const deleted = await LocationModel.destroy({
                where: { id }
            });
            return deleted;
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new ConstraintError('Error de restricción: No se puede eliminar la ubicación porque está en uso.');
            }
            throw error;
        }
    }
}

module.exports = LocationRepository;
