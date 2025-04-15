const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config()

const configs = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? `${process.env.DB_NAME}_test` : process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
} 

const sequelize = new Sequelize(configs)

module.exports = sequelize
