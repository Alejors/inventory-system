const express = require('express');
const cors = require('cors');
const config = require('./config');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { requestLogger } = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const createAuthRouter = require('./routes/auth');
const createCategoryRouter = require('./routes/categories');

// Import Repositories
const UserRepository = require('./repositories/UserRepository');
const CategoryRepository = require('./repositories/CategoryRepository');

// Import Services
const AuthService = require('./services/authService');
const InventoryService = require('./services/inventoryService');

// Import Controllers
const AuthController = require('./controllers/authController');
const CategoryController = require('./controllers/categoryController');

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

// Instanciar repositorios
const userRepository = new UserRepository();
const categoryRepository = new CategoryRepository();

// Instanciar servicios
const authService = new AuthService(userRepository);
const inventoryService = new InventoryService(categoryRepository);

// Instanciar controladores
const authController = new AuthController(authService);
const categoryController = new CategoryController(inventoryService);

// Routes
app.use('/api/auth', createAuthRouter(authController));
app.use('/api/categories', createCategoryRouter(categoryController));
// app.use('/api/products', productRoutes);
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