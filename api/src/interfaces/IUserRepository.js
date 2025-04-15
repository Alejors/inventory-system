const User = require('../entities/User.js');

class IUserRepository {
    async findById(id) {
        throw new Error('Method not implemented');
    }

    async findByFilter(filter) {
        throw new Error('Method not implemented');
    }

    async create(user) {
        throw new Error('Method not implemented');
    }

    async update(id, user) {
        throw new Error('Method not implemented');
    }

    async delete(id) {
        throw new Error('Method not implemented');
    }

    async findAll() {
        throw new Error('Method not implemented');
    }
} 

module.exports = IUserRepository;
