class User {
    constructor({ id, username, email, password, role, createdAt, updatedAt }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    isAdmin() {
        return this.role === 'admin';
    }

    canManageStorage() {
        return this.role === 'admin' || this.role === 'manager';
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
