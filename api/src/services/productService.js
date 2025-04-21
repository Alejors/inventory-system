const ConstraintError = require('../errors/constraintError'); // Asegúrate de tener este error definido

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository; // Repositorio concreto
    }

    async createProduct(productData) {
        
        const existingProduct = await this.productRepository.findByFilter({ sku: productData.sku });
        if (existingProduct.length > 0) {
            throw new ConstraintError('El producto ya existe.');
        }

        try {
            return await this.productRepository.create(productData);
        } catch (error) {
            if (error instanceof ConstraintError) {
                // Si hay un error de restricción, buscar el producto eliminado
                const deletedProduct = await this.productRepository.findByFilter({ sku: productData.sku }, true);
                if (deletedProduct.length > 0) {
                    // Actualizar el producto eliminado para restaurarlo
                    const productToRestore = deletedProduct[0];
                    await this.productRepository.update(productToRestore.id, { deletedAt: null });
                    return productToRestore;
                }
            }
            throw error;
        }
    }

    async getProductById(id, includeDeleted = false) {
        return await this.productRepository.findById(id, includeDeleted);
    }

    async getAllProducts(includeDeleted = false) {
        return await this.productRepository.findAll(includeDeleted);
    }

    async getProductsByFilter(filter, includeDeleted = false) {
        return await this.productRepository.findByFilter(filter, includeDeleted);
    }

    async updateProduct(id, productData) {
        return await this.productRepository.update(id, productData);
    }

    async deleteProduct(id) {
        return await this.productRepository.delete(id);
    }
}

module.exports = ProductService;
