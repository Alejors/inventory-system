const ConstraintError = require('../errors/constraintError');

class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    async createCategory(req, res) {
        const { name, description } = req.body;
        try {
            const category = await this.categoryService.createCategory({ name, description });
            res.status(201).json({ success: true, category });
        } catch (error) {
            if (error instanceof ConstraintError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                res.status(400).json({ success: false, message: error.message });
            }
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json({ success: true, categories });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getCategoriesByFilter(req, res) {
        const filter = req.query;
        try {
            const categories = await this.categoryService.getCategoriesByFilter(filter);
            res.status(200).json({ success: true, categories });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateCategory(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const category = await this.categoryService.updateCategory(id, { name, description });
            if (!category) {
                return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
            }
            res.status(200).json({ success: true, category });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.params;
        try {
            await this.categoryService.deleteCategory(id);
            res.status(200).json({ success: true, message: 'Categoría eliminada' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = CategoryController;
