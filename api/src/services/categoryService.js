const ConstraintError = require("../errors/constraintError");

class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(categoryData) {
        // Verificar si la categoría ya existe (elementos no eliminados)
        const existingCategory = await this.categoryRepository.findByFilter({ name: categoryData.name });
        if (existingCategory) {
            throw new ConstraintError('La categoría con este nombre ya existe');
        }
        try {
            return await this.categoryRepository.create(categoryData);
        } catch (error) {
            // Si el error es constraintError. Significa que existe la categoría pero eliminada
            if (error instanceof ConstraintError) {
                // Restaurar la categoría eliminada
                const deletedCategory = await this.categoryRepository.findByFilter({ name: categoryData.name }, true);
                const restoredCategory = await this.categoryRepository.update(deletedCategory.id, { deletedAt: null });
                return restoredCategory;
            }
            throw error;
        }
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

module.exports = CategoryService;
