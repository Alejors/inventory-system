class CompanyDTO {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  static fromObject(obj) {
    return new CompanyDTO(obj.name, obj.code);
  }
}

module.exports = CompanyDTO;
