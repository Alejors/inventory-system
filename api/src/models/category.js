const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoryModel = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
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
    tableName: 'categories',
    timestamps: true,
    paranoid: true,
});

CategoryModel.beforeUpdate((category, options) => {
    category.updatedAt = new Date();
});

module.exports = CategoryModel;
