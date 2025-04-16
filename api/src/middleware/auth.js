const { verifyToken, generateTokens } = require('../services/tokenService');
const { AuthError } = require('../errors/authError');

function authMiddleware(req, res, next) {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        
        if (!accessToken && !refreshToken) {
            throw new AuthError('No se proporcionaron tokens de acceso');
        }

        try {
            // Intentar verificar el access token
            const decoded = verifyToken(accessToken);
            req.user = decoded;
            return next();
        } catch (accessError) {
            // Si el access token está inválido, intentar con refresh token
            if (!refreshToken) {
                throw new AuthError('Token de acceso inválido y no hay token de refresco');
            }

            try {
                const decoded = verifyToken(refreshToken);
                const newAccessToken = generateTokens({ id: decoded.id, role: decoded.role }).accessToken;
                
                // Actualizar el access token en la cookie
                res.cookie('accessToken', newAccessToken, {
                    ...config.jwt.access.cookie,
                    path: '/'
                });
                
                req.user = decoded;
                return next();
            } catch (refreshError) {
                // Si el refresh token también está inválido
                throw new AuthError('Sesión expirada. Por favor, inicie sesión nuevamente');
            }
        }
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error de autenticación'
        });
    }
}

module.exports = {
    authMiddleware
};
