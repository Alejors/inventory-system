const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InventoryModel = sequelize.define('Inventory', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'locations',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        reorderPoint: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reorderQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        leadTimeDays: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
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
        tableName: 'inventories',
        timestamps: true,
        paranoid: true,
    }
);

InventoryModel.beforeUpdate((inventory, options) => {
    inventory.updatedAt = new Date();
});

module.exports = InventoryModel;