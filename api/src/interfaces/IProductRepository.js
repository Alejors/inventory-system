class IProductRepository {
    async create(product) {
        throw new Error('Method not implemented');
    }

    async findById(id, includeDeleted = false) {
        throw new Error('Method not implemented');
    }

    async findAll(includeDeleted = false) {
        throw new Error('Method not implemented');
    }

    async findByFilter(filter, includeDeleted = false) {
        throw new Error('Method not implemented');
    }

    async update(id, product) {
        throw new Error('Method not implemented');
    }

    async delete(id) {
        throw new Error('Method not implemented');
    }

    async restore(id) {
        throw new Error('Method not implemented');
    }
}

module.exports = IProductRepository;
