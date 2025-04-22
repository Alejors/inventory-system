const IUserRepository = require('../interfaces/IUserRepository.js');
const User = require('../entities/user.js');
const UserModel = require('../models/user.js');
const { sequelizeProcessFilters } = require('../utils/helpers');    
class UserRepository extends IUserRepository {
    async create(user) {
        const userModel = await UserModel.create({
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
            companyId: user.companyId
        });
        return User.fromObject(userModel.toJSON());
    }
    
    async findAll() {
        const userModels = await UserModel.findAll();
        return userModels.map(model => User.fromObject(model.toJSON()));
    }

    async findById(id) {
        const userModel = await UserModel.findByPk(id);
        if (!userModel) return null;
        return User.fromObject(userModel.toJSON());
    }

    async findByFilter(filter) {
        const processedFilter = sequelizeProcessFilters(filter);
        const userModel = await UserModel.findOne({ where: processedFilter });
        if (!userModel) return null;
        return User.fromObject(userModel.toJSON());
    }

    async update(id, userData) {
        const [updated] = await UserModel.update(userData, {
            where: { id }
        });
        if (updated) {
            const updatedUser = await this.findById(id);
            return User.fromObject(updatedUser.toJSON());
        }
        return null;
    }

    async delete(id) {
        const deleted = await UserModel.destroy({ where: { id } });
        return deleted > 0;
    }

} 

module.exports = UserRepository;
