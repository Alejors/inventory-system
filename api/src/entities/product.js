class Product {
    constructor(id, sku, name, description, categoryId, createdAt, updatedAt, deletedAt, category = null) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // Relación con la categoría
        this.category = category;
    }

    static fromObject(obj) {
        return new Product(obj.id, obj.sku, obj.name, obj.description, obj.categoryId, obj.createdAt, obj.updatedAt, obj.deletedAt, obj.category);
    }

    toJSON() {
        return {
            id: this.id,
            sku: this.sku,
            name: this.name,
            description: this.description,
            categoryId: this.categoryId,
            category: this.category ? this.category.toJSON() : null,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        };
    }
}

module.exports = Product;
