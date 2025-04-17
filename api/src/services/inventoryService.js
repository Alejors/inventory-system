const ConstraintError = require('../errors/constraintError');

class InventoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(categoryData) {
        const existingCategory = await this.categoryRepository.findByFilter({ name: categoryData.name });
        if (existingCategory.length > 0) {
            throw new ConstraintError('La categoría con este nombre ya existe');
        }
        return await this.categoryRepository.create(categoryData);
    }

    async getCategoryById(id) {
        return await this.categoryRepository.findById(id);
    }

    async getCategoriesByFilter(filter) {
        return await this.categoryRepository.findByFilter(filter);
    }

    async getAllCategories() {
        return await this.categoryRepository.findAll();
    }

    async updateCategory(id, categoryData) {
        return await this.categoryRepository.update(id, categoryData);
    }

    async deleteCategory(id) {
        return await this.categoryRepository.delete(id);
    }
}

module.exports = InventoryService;
