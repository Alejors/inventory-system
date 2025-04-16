const bcrypt = require("bcryptjs")
const { AuthError } = require("../errors/authError")
const { verifyToken, generateTokens } = require("./tokenService")

const SALT = 10;

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(payload) {
        try {
            const { username, email, password, role } = payload

            const emailExists = await this.userRepository.findByFilter({ email: email })
            if (emailExists) {
                throw new Error('El correo ya está registrado.')
            }

            const usernameExists = await this.userRepository.findByFilter({ username: username })
            if (usernameExists) {
                throw new Error('El nombre de usuario ya está registrado.')
            }
            
            const hashedPassword = await bcrypt.hash(password, SALT)

            const savedUser = await this.userRepository.create({
                username,
                email,
                password: hashedPassword,
                role: role || "user"
            })

            return savedUser
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`)
        }
    }

    async loginUser(payload) {
        try {
            const { email, password } = payload
            const user = await this.userRepository.findByFilter({ email: email })
            if (!user) {
                throw new AuthError('El correo y/o la contraseña son incorrectos.')
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                throw new AuthError('El correo y/o la contraseña son incorrectos.')
            }

            const tokens = generateTokens(user);

            return {
                user,
                ...tokens
            };
        } catch (error) {
            if (error instanceof AuthError) {
                throw error;
            }
            throw new Error(`Error al iniciar sesión: ${error.message}`)
        }
    }

    async changePassword(userId, { currentPassword, newPassword }) {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw new AuthError('Usuario no encontrado');
            }

            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                throw new AuthError('La contraseña actual es incorrecta');
            }

            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                throw new AuthError('La nueva contraseña debe ser diferente a la actual');
            }

            const hashedPassword = await bcrypt.hash(newPassword, SALT);
            await this.userRepository.update(userId, { password: hashedPassword });

            return { success: true, message: 'Contraseña actualizada exitosamente' };
        } catch (error) {
            if (error instanceof AuthError) {
                throw error;
            }
            throw new Error(`Error al cambiar la contraseña: ${error.message}`);
        }
    }
}

module.exports = AuthService;
