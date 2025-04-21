const { generateCompanyToken } = require("./tokenService");

class CompanyService {
  constructor(companyRepository, userRepository) {
    this.companyRepository = companyRepository;
    this.userRepository = userRepository;
  }

  async createCompany(companyData) {
    const company = await this.companyRepository.create(companyData);
    const companyToken = generateCompanyToken(company);
    return { company, companyToken };
  }

  async getCompanyById(id, includeDeleted = false) {
    return await this.companyRepository.findById(id, includeDeleted);
  }

  async getAllCompanies(includeDeleted = false) {
    return await this.companyRepository.findAll(includeDeleted);
  }

  async findCompaniesByFilter(filter, includeDeleted = false) {
    return await this.companyRepository.findByFilter(filter, includeDeleted);
  }

  async updateCompany(id, companyData) {
    return await this.companyRepository.update(id, companyData);
  }

  async deleteCompany(id) {
    return await this.companyRepository.delete(id);
  }

  async getToken(companyId, user) {
    const currentUser = await this.userRepository.findById(user.id);
    if (!currentUser.isAdmin() && currentUser.companyId !== companyId) {
        throw new Error('User not associated with company');
    }
    const company = await this.getCompanyById(companyId);
    return generateCompanyToken(company);
  }

}

module.exports = CompanyService;
