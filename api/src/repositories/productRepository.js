const { ProductModel } = require('../models/product');
const IProductRepository = require('../interfaces/IProductRepository');
const ProductEntity = require('../entities/product');
const { sequelizeProcessFilters } = require('../utils/helpers');


class ProductRepository extends IProductRepository {

    async create(productData) {
        try {
            const product = await ProductModel.create(productData);
            return new ProductEntity(product);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
                throw new ConstraintError('Error de restricción: ' + error.message);
            }
            throw error;
        }
    }

    async findById(id, includeDeleted = false) {
        const product = await ProductModel.findOne({ where: { id, paranoid: !includeDeleted  } });
        return product ? new ProductEntity(product) : null;
    }

    async findAll(includeDeleted = false) {
        const products = await ProductModel.findAll({ paranoid: !includeDeleted} );
        return products.map(product => new ProductEntity(product));
    }

    async findByFilter(filter, includeDeleted = false) {
        const processedFilter = sequelizeProcessFilters(filter);
        const products = await ProductModel.findAll({where: processedFilter, paranoid: !includeDeleted});
        return products.map(product => new ProductEntity(product));
    }

    async update(id, productData) {
        try {
            await ProductModel.update(productData, { where: { id } });
            return this.findById(id);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
                throw new ConstraintError('Error de restricción: ' + error.message);
            }
            throw error;
        }
    }

    async delete(id) {
        return await ProductModel.destroy({ where: { id } });
    }
}

module.exports = ProductRepository;
