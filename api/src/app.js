const express = require('express');
const cors = require('cors');
const config = require('./config');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { requestLogger } = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const createAuthRouter = require('./routes/auth');
const UserRepository = require('./repositories/UserRepository');
const AuthService = require('./services/authService');
const AuthController = require('./controllers/authController');

// Import routes
// const productRoutes = require('./routes/products');
// const categoryRoutes = require('./routes/categories');
// const locationRoutes = require('./routes/locations');
// const movementRoutes = require('./routes/movements');
// const dashboardRoutes = require('./routes/dashboard');

// Initialize express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(morgan(config.morgan));
app.use(cookieParser(config.jwt.secret));
app.use(express.json(config.express.json));
app.use(express.urlencoded(config.express.urlencoded));
app.use(requestLogger);

// Crear instancias con las dependencias inyectadas
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Routes
app.use('/api/auth', createAuthRouter(authController));
// app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/locations', locationRoutes);
// app.use('/api/movements', movementRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'API is running' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.API_PORT || 3000;

async function startServer() {
  try {
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;