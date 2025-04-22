const CategoryModel = require('../models/category');
const ICategoryRepository = require('../interfaces/ICategoryRepository');
const ConstraintError = require('../errors/constraintError');
const Category = require('../entities/category');
const { sequelizeProcessFilters } = require('../utils/helpers');

class CategoryRepository extends ICategoryRepository {
    async create(categoryData) {
        try {
            const category = await CategoryModel.create(categoryData);
            return Category.fromObject(category.toJSON());
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new ConstraintError('La categoría con este nombre ya existe');
            }
            throw error;
        }
    }

    async findById(id, includeDeleted = false) {
        const category = await CategoryModel.findByPk(id, { paranoid: !includeDeleted });
        return category ? Category.fromObject(category.toJSON()) : null;
    }

    async findByFilter(filter, includeDeleted = false) {
        const processedFilter = sequelizeProcessFilters(filter);
        const categories = await CategoryModel.findAll({ where: processedFilter, paranoid: !includeDeleted });
        return categories.map(cat => Category.fromObject(cat.toJSON()));
    }

    async findAll(includeDeleted = false) {
        const categories = await CategoryModel.findAll({ paranoid: !includeDeleted });
        return categories.map(cat => Category.fromObject(cat.toJSON()));
    }

    async update(id, categoryData) {
        const existingCategory = await this.findById(id, true);
        if (!existingCategory) {
            throw new Error('Categoría no encontrada');
        }
        try {
            await CategoryModel.update(categoryData, { where: { id } });
            const updatedCategory = this.findById(id);
            return Category.fromObject(updatedCategory.toJSON());
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
