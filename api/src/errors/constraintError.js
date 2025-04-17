class ConstraintError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConstraintError';
    }
}

module.exports = ConstraintError;
