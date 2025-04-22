const CompanyModel = require('../models/company');
const ICompanyRepository = require('../interfaces/ICompanyRepository');
const Company = require('../entities/company');
const { sequelizeProcessFilters } = require('../utils/helpers');
const ConstraintError = require('../errors/constraintError');


class CompanyRepository extends ICompanyRepository {
  async create(companyData) {
    try {
      const company = await CompanyModel.create(companyData);
      return new Company(company.toJSON());
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
        throw new ConstraintError('El código de la empresa ya existe');
      }
      console.error(error);
      throw error;
    }
  }

  async findById(id, includeDeleted = false) {
    const company = await CompanyModel.findOne({
      where: { id },
      paranoid: !includeDeleted,
    });
    return company ? Company.fromObject(company.toJSON()) : null;
  }

  async findAll(includeDeleted = false) {
    const companies = await CompanyModel.findAll({
      paranoid: !includeDeleted,
    });
    return companies.map(company => Company.fromObject(company.toJSON()));
  }

  async findByFilter(filter, includeDeleted = false) {
    const processedFilter = sequelizeProcessFilters(filter);
    const companies = await CompanyModel.findAll({
      where: processedFilter,
      paranoid: !includeDeleted,
    });
    return companies.map(company => Company.fromObject(company.toJSON()));
  }

  async update(id, companyData) {
    const company = await this.findById(id);
    if (company) {
      const updatedCompany = await company.update(companyData);
      return Company.fromObject(updatedCompany.toJSON());
    }
    return null;
  }

  async delete(id) {
    const company = await this.findById(id);
    if (company) {
      await company.destroy();
    }
  }

}

module.exports = CompanyRepository;
