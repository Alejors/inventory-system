class ProductDTO {
    constructor({ sku, name, description, categoryId }) {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
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
