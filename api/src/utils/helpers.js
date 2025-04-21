const { Op } = require('sequelize');

function sequelizeProcessFilters(filters) {
    const where = {};

    for (const [key, value] of Object.entries(filters)) {
        const parts = key.split('__');

        if (parts.length > 1) {
            const actualKey = parts[0];
            const operator = parts[1];

            switch (operator) {
                case 'like':
                    where[actualKey] = { [Op.like]: `%${value}%` };
                    break;
                case 'lt':
                    where[actualKey] = { [Op.lt]: value };
                    break;
                case 'gt':
                    where[actualKey] = { [Op.gt]: value };
                    break;
                case 'lte':
                    where[actualKey] = { [Op.lte]: value };
                    break;
                case 'gte':
                    where[actualKey] = { [Op.gte]: value };
                    break;
                default:
                    throw new Error(`El operador "${operator}" no está implementado`);
            }
        } else {
            where[key] = value;
        }
    }

    return where;
}

function sequelizeGenerateUserFilters(user) {
    const userFilters = {};
  
    if (user.isAdmin()) {
      return userFilters;
    } else {
      userFilters.companyId = user.companyId;
    }
  
    return userFilters;
  }

module.exports = { sequelizeProcessFilters, sequelizeGenerateUserFilters };