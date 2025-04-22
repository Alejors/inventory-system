const express = require('express');
const { authMiddleware, validateCompanyToken } = require('../middleware/auth');
const { validateUser } = require('../middleware/validation');
function createAuthRouter(authController) {
    const router = express.Router();

    router.post('/register', validateUser, validateCompanyToken, authController.createUser.bind(authController));
    router.post('/login', authController.loginUser.bind(authController));
    router.post('/logout', authController.logoutUser.bind(authController));
    router.post('/change-password', authMiddleware, authController.changePassword.bind(authController));

    return router;
}

module.exports = createAuthRouter;
