const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompanyModel = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'deleted_at',
  },
}, {
  tableName: 'companies',
  timestamps: true,
  paranoid: true,
});

CompanyModel.associate = (models) => {
  CompanyModel.hasMany(models.User, {
    foreignKey: 'companyId',
    as: 'users',
  });
  CompanyModel.hasMany(models.Location, {
    foreignKey: 'companyId',
    as: 'locations',
  });
};

module.exports = CompanyModel;
