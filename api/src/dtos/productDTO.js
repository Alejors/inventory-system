class ProductDTO {
    constructor(sku, name, description, categoryId) {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
    }

    static fromObject(obj) {
        return new ProductDTO(obj.sku, obj.name, obj.description, obj.categoryId);
    }

    toJSON() {
        return {
            sku: this.sku,
            name: this.name,
            description: this.description,
            categoryId: this.categoryId,
        };
    }
}

module.exports = ProductDTO;
