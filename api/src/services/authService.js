const bcrypt = require("bcryptjs")
const UserRepository = require("../repositories/UserRepository")
const { generateTokens } = require("../utils/helpers")
const { AuthError } = require("../errors/authError")

const SALT = 10;

const userRepository = new UserRepository()

async function createUser (payload) {
  try {
    const { username, email, password, role } = payload

    const emailExists = await userRepository.findByFilter({ email: email })
    if (emailExists) {
      throw new Error('El correo ya está registrado.')
    }

    const usernameExists = await userRepository.findByFilter({ username: username })

    if (usernameExists) {
      throw new Error('El nombre de usuario ya está registrado.')
    }
    
    const hashedPassword = await bcrypt.hash(password, SALT)

    const savedUser = await userRepository.create({
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

async function loginUser(payload) {
  try {
    const { email, password } = payload
    const user = await userRepository.findByFilter({ email: email })
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

module.exports = {
    createUser,
    loginUser
}
