const LocationModel = require('../models/location');
const ILocationRepository = require('../interfaces/ILocationRepository');
const ConstraintError = require('../errors/constraintError');
const Location = require('../entities/location');
const { sequelizeGenerateUserFilters } = require('../utils/helpers');

class LocationRepository extends ILocationRepository {
    async create(locationData, user) {
        try {
            const location = await LocationModel.create({...locationData, companyId: user.companyId});
            return Location.fromObject(location.toJSON());
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
                throw new ConstraintError('Error de restricción: ' + error.message);
            }
            throw error;
        }
    }

    async findById(id, user, includeDeleted = false) {
        const userFilters = sequelizeGenerateUserFilters(user);
        const location = await LocationModel.findByPk(id, { where: userFilters, paranoid: !includeDeleted });
        return location ? Location.fromObject(location.toJSON()) : null;
    }

    async findAll(user, includeDeleted = false) {
        const userFilters = sequelizeGenerateUserFilters(user);
        const locations = await LocationModel.findAll({ where: userFilters, paranoid: !includeDeleted});
        return locations.map(loc => Location.fromObject(loc.toJSON()));
    }

    async findByFilter(filter, user, includeDeleted = false) {
        const processedFilter = sequelizeProcessFilters(filter);
        const userFilters = sequelizeGenerateUserFilters(user);
        const locations = await LocationModel.findAll({ where: {...processedFilter, ...userFilters}, paranoid: !includeDeleted });
        return locations.map(loc => Location.fromObject(loc.toJSON()));
    }

    async update(id, locationData, user) {
        const userFilters = sequelizeGenerateUserFilters(user);
        try {
            const [updated] = await LocationModel.update(locationData, {
                where: { id, ...userFilters }
            });
            return updated ? this.findById(id, user) : null;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
                throw new ConstraintError('Error de restricción: ' + error.message);
            }
            throw error;
        }
    }

    async delete(id, user) {
        const userFilters = sequelizeGenerateUserFilters(user);
        try {
            const deleted = await LocationModel.destroy({
                where: { id, ...userFilters }
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
