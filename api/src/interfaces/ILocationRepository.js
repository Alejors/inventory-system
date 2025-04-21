class ILocationRepository {
    async create(location, user) {
        throw new Error('Method not implemented');
    }

    async findById(id, user, includeDeleted = false) {
        throw new Error('Method not implemented');
    }

    async findAll(user, includeDeleted = false) {
        throw new Error('Method not implemented');
    }

    async findByFilter(filter, user, includeDeleted = false) {
        throw new Error('Method not implemented');
    }

    async update(id, location, user) {
        throw new Error('Method not implemented');
    }

    async delete(id, user) {
        throw new Error('Method not implemented');
    }
}

module.exports = ILocationRepository;
