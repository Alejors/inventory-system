const CategoryModel = require('../models/category');
const ICategoryRepository = require('../interfaces/ICategoryRepository');
const ConstraintError = require('../errors/constraintError');
const CategoryEntity = require('../entities/category');

class CategoryRepository extends ICategoryRepository {
    async create(categoryData) {
        try {
            const category = await CategoryModel.create(categoryData);
            return new CategoryEntity(category.toJSON());
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new ConstraintError('La categoría con este nombre ya existe');
            }
            throw error;
        }
    }

    async findById(id, includeDeleted = false) {
        const category = await CategoryModel.findByPk(id, { paranoid: !includeDeleted });
        return category ? new CategoryEntity(category.toJSON()) : null;
    }

    async findByFilter(filter, includeDeleted = false) {
        const categories = await CategoryModel.findAll({ where: filter, paranoid: !includeDeleted });
        return categories.map(cat => new CategoryEntity(cat.toJSON()));
    }

    async findAll(includeDeleted = false) {
        const categories = await CategoryModel.findAll({ paranoid: !includeDeleted });
        return categories.map(cat => new CategoryEntity(cat.toJSON()));
    }

    async update(id, categoryData) {
        const existingCategory = await this.findById(id, true);
        if (!existingCategory) {
            throw new Error('Categoría no encontrada');
        }
        try {
            await CategoryModel.update(categoryData, { where: { id } });
            return new CategoryEntity({ ...existingCategory, ...categoryData });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new ConstraintError('La categoría con este nombre ya existe');
            }
            throw error;
        }
    }

    async delete(id) {
        const result = await CategoryModel.destroy({ where: { id } });
        if (!result) {
            throw new Error('Categoría no encontrada');
        }
        return result;
    }
}

module.exports = CategoryRepository;
