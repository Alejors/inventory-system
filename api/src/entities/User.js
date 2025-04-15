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

    validate() {
        if (!this.username || this.username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        if (!this.email || !this.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        if (!this.password || this.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        if (!this.role || !['admin', 'manager', 'user'].includes(this.role)) {
            throw new Error('Invalid role');
        }
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
