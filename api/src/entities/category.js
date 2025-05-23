class Category {
    constructor(id, name, description, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static fromObject(obj) {
        return new Category(obj.id, obj.name, obj.description, obj.createdAt, obj.updatedAt, obj.deletedAt);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        };
    }
}

module.exports = Category;
