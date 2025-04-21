class ICompanyRepository {
  create(companyData) {
    throw new Error("Method 'create()' must be implemented.");
  }

  findById(id, includeDeleted = false) {
    throw new Error("Method 'findById()' must be implemented.");
  }

  findAll(includeDeleted = false) {
    throw new Error("Method 'findAll()' must be implemented.");
  }

  findByFilter(filter, includeDeleted = false) {
    throw new Error("Method 'findByFilter()' must be implemented.");
  }
  
  update(id, companyData) {
    throw new Error("Method 'update()' must be implemented.");
  }

  delete(id) {
    throw new Error("Method 'delete()' must be implemented.");
  }

}

module.exports = ICompanyRepository;
