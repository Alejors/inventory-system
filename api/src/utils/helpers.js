const jwt = require('jsonwebtoken');
const config = require('../config');

function generateTokens(user) {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    const accessToken = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.access.expiresIn
    });

    const refreshToken = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.refresh.expiresIn
    });

    return {
        accessToken,
        refreshToken
    };
}

module.exports = {
    generateTokens
};
