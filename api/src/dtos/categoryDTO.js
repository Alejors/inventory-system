class CategoryDTO {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  static fromObject(obj) {
    return new CategoryDTO(obj.name, obj.description);
  }
}

module.exports = CategoryDTO;
