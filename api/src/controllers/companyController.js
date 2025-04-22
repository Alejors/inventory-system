const companyDTO = require('../dtos/companyDTO');
const { AuthError } = require('../errors/authError');


class CompanyController {
  constructor(companyService) {
    this.companyService = companyService;
  }

  async create(req, res) {
    const companyData = companyDTO.fromObject(req.body);
    try {
      const { newCompany, companyToken } = await this.companyService.createCompany(companyData);
      res.status(201).json({ success: true, company: newCompany, token: companyToken });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating company', error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const company = await this.companyService.getCompanyById(id);
      if (company) {
        res.status(200).json({ success: true, company });
      } else {
        res.status(404).json({ success: false, message: 'Company not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching company', error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const includeDeleted = req.query.includeDeleted === 'true';
      const companies = await this.companyService.getAllCompanies(includeDeleted);
      res.status(200).json({ success: true, companies });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching companies', error: error.message });
    }
  }

  async findByFilter(req, res) {
    try {
      const filter = req.query; // Puedes ajustar esto según cómo desees recibir el filtro
      const includeDeleted = req.query.includeDeleted === 'true';
      const companies = await this.companyService.findCompaniesByFilter(filter, includeDeleted);
      res.status(200).json({ success: true, companies });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching companies by filter', error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const companyData = req.body;
      const updatedCompany = await this.companyService.updateCompany(id, companyData);
      if (updatedCompany) {
        res.status(200).json({ success: true, company: updatedCompany });
      } else {
        res.status(404).json({ success: false, message: 'Company not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating company', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.companyService.deleteCompany(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting company', error: error.message });
    }
  }

  async getToken(req, res) {
    const { companyId } = req.params;
    const user = req.user;
    try {
        const token = await this.companyService.getToken(companyId, user);
        res.status(201).json({ success: true, token });
    } catch (error) {
        if(error.message === 'User not associated with company' || error instanceof AuthError) {
            res.status(403).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: error.message });
        }
    }
  }

}

module.exports = CompanyController;
