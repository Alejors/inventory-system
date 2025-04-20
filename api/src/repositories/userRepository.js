const IUserRepository = require('../interfaces/IUserRepository.js');
const User = require('../entities/user.js');
const UserModel = require('../models/user.js');

class UserRepository extends IUserRepository {
    async findById(id) {
        const userModel = await UserModel.findByPk(id);
        if (!userModel) return null;
        return new User(userModel.toJSON());
    }

    async findByFilter(filter) {
        const userModel = await UserModel.findOne({ where: filter });
        if (!userModel) return null;
        return new User(userModel.toJSON());
    }

    async create(user) {
        const userModel = await UserModel.create({
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        });
        return new User(userModel.toJSON());
    }

    async update(id, userData) {
        const [updated] = await UserModel.update(userData, {
            where: { id }
        });
        if (updated) {
            const updatedUser = await this.findById(id);
            return updatedUser;
        }
        return null;
    }

    async delete(id) {
        const deleted = await UserModel.destroy({ where: { id } });
        return deleted > 0;
    }

    async findAll() {
        const userModels = await UserModel.findAll();
        return userModels.map(model => new User(model.toJSON()));
    }
} 

module.exports = UserRepository;
