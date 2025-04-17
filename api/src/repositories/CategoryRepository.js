const Category = require('../models/Category');
const ICategoryRepository = require('../interfaces/ICategoryRepository');
const ConstraintError = require('../errors/constraintError');

class CategoryRepository extends ICategoryRepository {
    async create(category) {
        try {
            return await Category.create(category);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new ConstraintError('La categoría con este nombre ya existe');
            }
            throw error;
        }
    }

    async findById(id) {
        return await Category.findByPk(id);
    }

    async findByFilter(filter) {
        return await Category.findAll({ where: filter });
    }

    async findAll() {
        return await Category.findAll();
    }

    async update(id, category) {
        const existingCategory = await this.findById(id);
        if (!existingCategory) {
            throw new Error('Categoría no encontrada');
        }
        try {
            return await existingCategory.update(category);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new ConstraintError('La categoría con este nombre ya existe');
            }
            throw error;
        }
    }

    async delete(id) {
        const result = await Category.destroy({ where: { id } });
        if (!result) {
            throw new Error('Categoría no encontrada');
        }
        return result;
    }
}

module.exports = CategoryRepository;
