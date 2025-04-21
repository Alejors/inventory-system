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
const createLocationRouter = require('./routes/locations');
const createProductRouter = require('./routes/products');
const createCompanyRouter = require('./routes/company');

// Import Repositories
const UserRepository = require('./repositories/userRepository');
const CategoryRepository = require('./repositories/categoryRepository');
const LocationRepository = require('./repositories/locationRepository');
const ProductRepository = require('./repositories/productRepository');
const CompanyRepository = require('./repositories/companyRepository');

// Import Services
const AuthService = require('./services/authService');
const InventoryService = require('./services/inventoryService');
const LocationService = require('./services/locationService');
const CategoryService = require('./services/categoryService');
const ProductService = require('./services/productService');
const CompanyService = require('./services/companyService');

// Import Controllers
const AuthController = require('./controllers/authController');
const CategoryController = require('./controllers/categoryController');
const LocationController = require('./controllers/locationController');
const ProductController = require('./controllers/productController');
const CompanyController = require('./controllers/companyController');

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
const locationRepository = new LocationRepository();
const productRepository = new ProductRepository();
const companyRepository = new CompanyRepository();

// Instanciar servicios
const authService = new AuthService(userRepository);
const inventoryService = new InventoryService();
const categoryService = new CategoryService(categoryRepository);
const locationService = new LocationService(locationRepository, userRepository);
const productService = new ProductService(productRepository);
const companyService = new CompanyService(companyRepository, userRepository);

// Instanciar controladores
const authController = new AuthController(authService);
const categoryController = new CategoryController(categoryService);
const locationController = new LocationController(locationService);
const productController = new ProductController(productService);
const companyController = new CompanyController(companyService);

// Routes
app.use('/api/auth', createAuthRouter(authController));
app.use('/api/categories', createCategoryRouter(categoryController));
app.use('/api/locations', createLocationRouter(locationController));
app.use('/api/products', createProductRouter(productController));
app.use('/api/companies', createCompanyRouter(companyController));
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