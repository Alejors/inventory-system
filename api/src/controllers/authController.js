const authService = require("../services/authService")
const { AuthError } = require("../errors/authError")
const config = require("../config")

async function createUserController (req, res) {
    try {
        const data = req.body
        const response = await authService.createUser(data)

        return res.status(201).json({
            success: true,
            data: response,
            message: "Usuario Creado."
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error })
    }
}

async function loginUserController(req, res) {
    try {
        const credentials = req.body;
        const result = await authService.loginUser(credentials);

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

module.exports = {
    createUserController,
    loginUserController
};