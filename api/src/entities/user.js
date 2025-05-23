class User {
    constructor(id, username, email, password, role, companyId, createdAt, updatedAt, company = null) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.companyId = companyId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        
        this.company = company;
    }

    isAdmin() {
        return this.role === 'admin';
    }

    canManageStorage() {
        return this.role === 'admin' || this.role === 'manager';
    }

    static fromObject(obj) {
        return new User(obj.id, obj.username, obj.email, obj.password, obj.role, obj.companyId, obj.createdAt, obj.updatedAt);
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
} 

module.exports = User;
