class Company {
  constructor(id, name, code, createdAt, updatedAt, deletedAt) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromObject(obj) {
    return new Company(obj.id, obj.name, obj.code, obj.createdAt, obj.updatedAt, obj.deletedAt);
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
