const ConstraintError = require('../errors/constraintError');
const ProductEvent = require('../entities/productEvent');


const productCreation = 'create';
const productUpdate = 'update';
const productDelete = 'delete';

class ProductService {
    constructor(productRepository, productEventRepository) {
        this.productRepository = productRepository;
        this.productEventRepository = productEventRepository;
    }

    async createProduct(productData, userId) {
        const existingProduct = await this.productRepository.findByFilter({ sku: productData.sku });
        if (existingProduct.length > 0) {
            throw new ConstraintError('El producto ya existe.');
        }

        try {
            const createdProduct = await this.productRepository.create(productData); 
            // Cuando se crea un producto, se crea un evento de creación
            const productEvent = ProductEvent.fromObject({
                productId: createdProduct.id,
                eventType: productCreation,
                newData: createdProduct.toJSON(),
                userId: userId,
            });
            await this.productEventRepository.create(productEvent);
            return createdProduct;
        } catch (error) {
            if (error instanceof ConstraintError) {
                // Si hay un error de restricción, buscar el producto eliminado
                const deletedProduct = await this.productRepository.findByFilter({ sku: productData.sku }, true);
                if (deletedProduct.length > 0) {
                    // Actualizar el producto eliminado para restaurarlo
                    const productToRestore = deletedProduct[0];
                    const restoredProduct = await this.productRepository.restore(productToRestore.id);
                    // Cuando se restaura un producto, se crea un evento de actualización
                    const productEvent = ProductEvent.fromObject({
                        productId: productToRestore.id,
                        eventType: productUpdate,
                        previousData: productToRestore.toJSON(),
                        newData: restoredProduct.toJSON(),
                        userId: userId,
                    });
                    await this.productEventRepository.create(productEvent);
                    return restoredProduct;
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

    async updateProduct(id, productData, userId) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new ConstraintError('El producto no existe.');
        }
        const updatedProduct = await this.productRepository.update(id, productData);
        // Cuando se actualiza un producto, se crea un evento de actualización
        const productEvent = ProductEvent.fromObject({
            productId: product.id,
            eventType: productUpdate,
            previousData: product.toJSON(),
            newData: updatedProduct.toJSON(),
            userId: userId,
        });
        await this.productEventRepository.create(productEvent);
        return updatedProduct;
    }

    async deleteProduct(id, userId) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new ConstraintError('El producto no existe.');
        }
        // Cuando se elimina un producto, se crea un evento de eliminación
        const productEvent = ProductEvent.fromObject({
            productId: product.id,
            eventType: productDelete,
            previousData: product.toJSON(),
            userId: userId,
        });
        await this.productEventRepository.create(productEvent);
        return await this.productRepository.delete(id);
    }
}

module.exports = ProductService;
