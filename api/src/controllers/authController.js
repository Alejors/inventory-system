const { AuthError } = require("../errors/authError")
const config = require("../config");
const UserDTO = require("../dtos/userDTO");
const ConstraintError = require("../errors/constraintError");
const { ValidationError } = require('sequelize');

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async createUser(req, res) {
        try {
            const data = req.body
            const userDTO = UserDTO.fromObject(data)
            if (userDTO.role === 'admin' && (!req.user || req.user.role !== 'admin')) {
                return res.status(403).json({
                    success: false,
                    message: "No tienes permisos para crear un usuario administrador"
                })
            }
            const response = await this.authService.createUser(userDTO)

            return res.status(201).json({
                success: true,
                data: response,
                message: "Usuario Creado."
            })
        } catch (error) {
            if (error instanceof ConstraintError) {
                return res.status(409).json({
                    success: false,
                    message: error.message
                })
            } else if (error instanceof ValidationError) {
                return res.status(422).json({
                    success: false,
                    message: error.message
                })
            }
            console.error(error)
            res.status(500).json({ success: false, error })
        }
    }

    async loginUser(req, res) {
        try {
            const credentials = req.body;
            const result = await this.authService.loginUser(credentials);

            // Limpiar cookies existentes antes de establecer las nuevas
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            // Establecer nuevas cookies
            res.cookie('accessToken', result.accessToken, {
                ...config.jwt.access.cookie,
                path: '/'
            });
            res.cookie('refreshToken', result.refreshToken, {
                ...config.jwt.refresh.cookie,
                path: '/'
            });

            res.status(200).json({
                success: true,
                user: result.user,
                message: "Login exitoso"
            });
        } catch (error) {
            if (error instanceof AuthError) {
                return res.status(401).json({ 
                    success: false,
                    error: error.message 
                });
            }
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor' 
            });
        }
    }

    async logoutUser(req, res) {
        try {
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;
            if (!accessToken && !refreshToken) {
                return res.status(400).json({
                    success: false,
                    error: "No hay ninguna sesión iniciada"
                })
            }

            // Limpiar las cookies
            res.clearCookie('accessToken', {
                ...config.jwt.access.cookie,
                path: '/'
            });
            res.clearCookie('refreshToken', {
                ...config.jwt.refresh.cookie,
                path: '/'
            });

            res.status(200).json({
                success: true,
                message: "Sesión cerrada exitosamente"
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: 'Error interno del servidor' 
            });
        }
    }

    async changePassword(req, res) {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;

            const result = await this.authService.changePassword(userId, { currentPassword, newPassword });

            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            if (error instanceof AuthError) {
                return res.status(401).json({ 
                    success: false,
                    message: error.message 
                });
            }
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = AuthController;