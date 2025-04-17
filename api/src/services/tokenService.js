const jwt = require('jsonwebtoken');
const { AuthError } = require("../errors/authError");
const config = require("../config");

function generateTokens(user) {
    const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.access.expiresIn }
    );

    const refreshToken = jwt.sign(
        { id: user.id, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.refresh.expiresIn }
    );

    return {
        accessToken,
        refreshToken
    };
}

function verifyToken(token) {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AuthError('Token inválido o expirado');
        }
        throw error;
    }
}

module.exports = {
    generateTokens,
    verifyToken
}; 