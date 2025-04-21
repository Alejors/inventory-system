const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'companies',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  paranoid: true,
});

UserModel.beforeUpdate((user, options) => {
  user.updatedAt = new Date();
});

UserModel.associate = (models) => {
  UserModel.belongsTo(models.Company, {
    foreignKey: 'companyId',
    as: 'company',
  });
};

module.exports = UserModel;
