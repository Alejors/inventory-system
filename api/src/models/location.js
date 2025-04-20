const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LocationModel = sequelize.define('Location', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    references: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('warehouse', 'store', 'supplier'),
        allowNull: false
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
        allowNull: true,
        field: 'deleted_at'
    },
  },
  {
    tableName: 'locations',
    timestamps: true,
    paranoid: true,
  }
)

LocationModel.beforeUpdate((location, options) => {
    location.updatedAt = new Date();
});

module.exports = LocationModel;
