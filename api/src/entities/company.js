class Company {
  constructor(id, name, code, createdAt, updatedAt, deletedAt) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
    };
  }
}

module.exports = Company;
