'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insertar usuarios
    const hashedPasswords = await Promise.all([
      bcrypt.hash('admin123', 10),
      bcrypt.hash('manager123', 10),
      bcrypt.hash('user123', 10)
    ]);

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@inventory.com',
        password: hashedPasswords[0],
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'manager',
        email: 'manager@inventory.com',
        password: hashedPasswords[1],
        role: 'manager',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'user',
        email: 'user@inventory.com',
        password: hashedPasswords[2],
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Insertar categorías
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Electrónicos',
        description: 'Productos electrónicos y gadgets',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ropa',
        description: 'Prendas de vestir y accesorios',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Alimentos',
        description: 'Productos alimenticios',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hogar',
        description: 'Artículos para el hogar',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Insertar ubicaciones
    await queryInterface.bulkInsert('locations', [
      {
        name: 'Almacén Central',
        address: '123 Calle Principal, Ciudad',
        type: 'warehouse',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tienda Norte',
        address: '456 Avenida Norte, Ciudad',
        type: 'store',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tienda Sur',
        address: '789 Avenida Sur, Ciudad',
        type: 'store',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Proveedor Principal',
        address: '101 Calle Industrial, Ciudad',
        type: 'supplier',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Insertar productos
    await queryInterface.bulkInsert('products', [
      {
        sku: 'ELEC-001',
        name: 'Smartphone X',
        description: 'Smartphone de última generación',
        category_id: 1,
        unit_price: 599.99,
        reorder_point: 5,
        reorder_quantity: 10,
        lead_time_days: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'ELEC-002',
        name: 'Laptop Pro',
        description: 'Laptop para profesionales',
        category_id: 1,
        unit_price: 1299.99,
        reorder_point: 3,
        reorder_quantity: 5,
        lead_time_days: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'ROPA-001',
        name: 'Camiseta Básica',
        description: 'Camiseta de algodón',
        category_id: 2,
        unit_price: 19.99,
        reorder_point: 20,
        reorder_quantity: 50,
        lead_time_days: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'ROPA-002',
        name: 'Jeans Clásicos',
        description: 'Jeans de mezclilla',
        category_id: 2,
        unit_price: 39.99,
        reorder_point: 15,
        reorder_quantity: 30,
        lead_time_days: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'ALIM-001',
        name: 'Café Premium',
        description: 'Café de especialidad',
        category_id: 3,
        unit_price: 9.99,
        reorder_point: 30,
        reorder_quantity: 60,
        lead_time_days: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'HOGAR-001',
        name: 'Set de Toallas',
        description: 'Juego de 4 toallas',
        category_id: 4,
        unit_price: 29.99,
        reorder_point: 10,
        reorder_quantity: 20,
        lead_time_days: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // Insertar inventario inicial
    await queryInterface.bulkInsert('inventory', [
      { product_id: 1, location_id: 1, quantity: 25, created_at: new Date(), updated_at: new Date() },
      { product_id: 1, location_id: 2, quantity: 10, created_at: new Date(), updated_at: new Date() },
      { product_id: 1, location_id: 3, quantity: 8, created_at: new Date(), updated_at: new Date() },
      { product_id: 2, location_id: 1, quantity: 15, created_at: new Date(), updated_at: new Date() },
      { product_id: 2, location_id: 2, quantity: 5, created_at: new Date(), updated_at: new Date() },
      { product_id: 3, location_id: 1, quantity: 100, created_at: new Date(), updated_at: new Date() },
      { product_id: 3, location_id: 2, quantity: 30, created_at: new Date(), updated_at: new Date() },
      { product_id: 3, location_id: 3, quantity: 25, created_at: new Date(), updated_at: new Date() },
      { product_id: 4, location_id: 1, quantity: 75, created_at: new Date(), updated_at: new Date() },
      { product_id: 5, location_id: 1, quantity: 120, created_at: new Date(), updated_at: new Date() },
      { product_id: 6, location_id: 1, quantity: 50, created_at: new Date(), updated_at: new Date() }
    ]);

    // Insertar movimientos históricos
    await queryInterface.bulkInsert('movements', [
      {
        product_id: 1,
        from_location_id: 1,
        to_location_id: 2,
        quantity: 5,
        movement_type: 'transfer',
        reference_number: 'TRF-001',
        user_id: 1,
        created_at: new Date()
      },
      {
        product_id: 3,
        from_location_id: 1,
        to_location_id: 3,
        quantity: 15,
        movement_type: 'transfer',
        reference_number: 'TRF-002',
        user_id: 1,
        created_at: new Date()
      },
      {
        product_id: 1,
        from_location_id: null,
        to_location_id: 1,
        quantity: 30,
        movement_type: 'purchase',
        reference_number: 'PO-001',
        user_id: 1,
        created_at: new Date()
      },
      {
        product_id: 2,
        from_location_id: null,
        to_location_id: 1,
        quantity: 20,
        movement_type: 'purchase',
        reference_number: 'PO-002',
        user_id: 1,
        created_at: new Date()
      }
    ]);

    // Insertar datos históricos de ventas
    const salesData = [];
    const today = new Date();
    
    // Generar datos de ventas para los últimos 30 días
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      salesData.push({
        product_id: 1,
        location_id: 2,
        quantity: Math.floor(Math.random() * 3) + 1,
        date: date,
        created_at: new Date()
      });
      
      salesData.push({
        product_id: 3,
        location_id: 2,
        quantity: Math.floor(Math.random() * 5) + 3,
        date: date,
        created_at: new Date()
      });
    }

    await queryInterface.bulkInsert('sales_history', salesData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales_history', null, {});
    await queryInterface.bulkDelete('movements', null, {});
    await queryInterface.bulkDelete('inventory', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('locations', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
}; 