const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductEventModel = sequelize.define('ProductEvent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      field: 'product_id'
    },
    eventType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'event_type'
    },
    previousData: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'previous_data'
    },
    newData: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'new_data'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
      field: 'created_at'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id'
    },
  }, {
    tableName: 'product_events',
    timestamps: false,
  });

module.exports = ProductEventModel;
