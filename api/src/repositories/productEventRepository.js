const ProductEventModel = require('../models/productEvent');
const ProductEvent = require('../entities/productEvent');
const { sequelizeProcessFilters } = require('../utils/helpers');
const IProductEventRepository = require('../interfaces/IProductEventRepository');

class ProductEventRepository extends IProductEventRepository {
  async create(productEvent) {
    const createdEvent = await ProductEventModel.create(productEvent.toJSON());
    return ProductEvent.fromObject(createdEvent.toJSON());
  }

  async getByFilter(filter) {
    const processedFilter = sequelizeProcessFilters(filter);
    const events = await ProductEventModel.findAll({
      where: processedFilter,
      order: [['createdAt', 'DESC']],
    });
    return events.map(event => ProductEvent.fromObject(event.toJSON()));
  }

  async delete(eventId) {
    return await ProductEventModel.destroy({ where: { id: eventId } });
  }
}

module.exports = ProductEventRepository;
