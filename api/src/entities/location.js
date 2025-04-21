class Location {
    constructor({ id, name, address, references, type, companyId, createdAt, updatedAt, deletedAt, company = null }) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.references = references;
        this.type = type;
        this.companyId = companyId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        this.company = company;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            references: this.references,
            type: this.type,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        };
    }
}

module.exports = Location;
