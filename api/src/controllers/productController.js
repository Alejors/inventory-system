const ConstraintError = require('../errors/constraintError');
const ProductDTO = require('../dtos/productDTO');
class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    async createProduct(req, res) {
        const productDTO = ProductDTO.fromObject(req.body);
        const userId = req.user.id;
        try {
            const product = await this.productService.createProduct(productDTO, userId);
            res.status(201).json({ success: true, product });
        } catch (error) {
            if (error instanceof ConstraintError) {
                return res.status(409).json({ success: false, message: error.message });
            }
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado' });
            }
            res.status(200).json({ success: true, product });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json({ success: true, products });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getProductsByFilter(req, res) {
        try {
            const filters = req.query;
            const products = await this.productService.getProductsByFilter(filters);
            res.status(200).json({ success: true, products });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const updatedProduct = await this.productService.updateProduct(id, productData);
            res.status(200).json({ success: true, updatedProduct });
        } catch (error) {
            if (error instanceof ConstraintError) {
                return res.status(409).json({ success: false, message: error.message });
            }
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            await this.productService.deleteProduct(id, userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = ProductController;
