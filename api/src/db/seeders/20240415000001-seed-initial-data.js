'use strict'
const bcrypt = require('bcryptjs')

const DATE1 = new Date('2025-04-21T12:30:00'); // 21 de Abril de 2025 a las 12:30:00
const DATE2 = new Date('2025-03-15T13:45:00'); // 15 de Marzo de 2025 a las 13:45:00

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insertar compañías
    await queryInterface.bulkInsert('companies', [
      {
        id: 1,
        name: 'Compañía 1',
        code: 'COMP1',
        created_at: DATE1,
        updated_at: DATE1,
      },
      {
        id: 2,
        name: 'Compañía 2',
        code: 'COMP2',
        created_at: DATE1,
        updated_at: DATE1,
      }
    ])

    // Insertar usuarios
    const hashedPasswords = await Promise.all([
      bcrypt.hash('admin123', 10),
      bcrypt.hash('manager123', 10),
      bcrypt.hash('user123', 10)
    ])

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'admin',
        email: 'admin@inventory.com',
        password: hashedPasswords[0],
        role: 'admin',
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 2,
        username: 'manager',
        email: 'manager@inventory.com',
        password: hashedPasswords[1],
        role: 'manager',
        companyId: 1,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 3,
        username: 'user',
        email: 'user@inventory.com',
        password: hashedPasswords[2],
        role: 'user',
        companyId: 1,
        created_at: DATE1,
        updated_at: DATE1
      }
    ])

    // Insertar categorías
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Electrónicos',
        description: 'Productos electrónicos y gadgets',
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 2,
        name: 'Ropa',
        description: 'Prendas de vestir y accesorios',
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 3,
        name: 'Alimentos',
        description: 'Productos alimenticios',
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 4,
        name: 'Hogar',
        description: 'Artículos para el hogar',
        created_at: DATE1,
        updated_at: DATE1
      }
    ])

    // Insertar ubicaciones
    await queryInterface.bulkInsert('locations', [
      {
        id: 1,
        name: 'Almacén Central',
        address: '123 Calle Principal, Ciudad',
        type: 'warehouse',
        companyId: 1,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 2,
        name: 'Tienda Norte',
        address: '456 Avenida Norte, Ciudad',
        type: 'store',
        companyId: 1,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 3,
        name: 'Tienda Sur',
        address: '789 Avenida Sur, Ciudad',
        type: 'store',
        companyId: 2,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 4,
        name: 'Proveedor Principal',
        address: '101 Calle Industrial, Ciudad',
        type: 'supplier',
        companyId: 2,
        created_at: DATE1,
        updated_at: DATE1
      }
    ])

    // Insertar productos
    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        sku: 'ELEC-001',
        name: 'Smartphone X',
        description: 'Smartphone de última generación',
        category_id: 1,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 2,
        sku: 'ELEC-002',
        name: 'Laptop Pro',
        description: 'Laptop para profesionales',
        category_id: 1,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 3,
        sku: 'ROPA-001',
        name: 'Camiseta Básica',
        description: 'Camiseta de algodón',
        category_id: 2,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 4,
        sku: 'ROPA-002',
        name: 'Jeans Clásicos',
        description: 'Jeans de mezclilla',
        category_id: 2,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 5,
        sku: 'ALIM-001',
        name: 'Café Premium',
        description: 'Café de especialidad',
        category_id: 3,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 6,
        sku: 'HOGAR-001',
        name: 'Set de Toallas',
        description: 'Juego de 4 toallas',
        category_id: 4,
        created_at: DATE1,
        updated_at: DATE1
      }
    ])

    // Insertar inventario inicial
    await queryInterface.bulkInsert('inventory', [
      {
        id: 1,
        product_id: 1,
        location_id: 1,
        quantity: 25,
        unitPrice: 599.99,
        reorderPoint: 5,
        reorderQuantity: 10,
        leadTimeDays: 5,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 2,
        product_id: 1,
        location_id: 2,
        quantity: 10,
        unitPrice: 609.99,
        reorderPoint: 10,
        reorderQuantity: 10,
        leadTimeDays: 6,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 3,
        product_id: 1,
        location_id: 3,
        quantity: 8,
        unitPrice: 589.99,
        reorderPoint: 5,
        reorderQuantity: 5,
        leadTimeDays: 4,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 4,
        product_id: 2,
        location_id: 1,
        quantity: 15,
        unitPrice: 1299.99,
        reorderPoint: 3,
        reorderQuantity: 5,
        leadTimeDays: 7,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 5,
        product_id: 2,
        location_id: 2,
        quantity: 5,
        unitPrice: 1399.99,
        reorderPoint: 3,
        reorderQuantity: 5,
        leadTimeDays: 9,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 6,
        product_id: 3,
        location_id: 1,
        quantity: 100,
        unitPrice: 19.99,
        reorderPoint: 20,
        reorderQuantity: 50,
        leadTimeDays: 3,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 7,
        product_id: 3,
        location_id: 2,
        quantity: 30,
        unitPrice: 20.99,
        reorderPoint: 20,
        reorderQuantity: 50,
        leadTimeDays: 4,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 8,
        product_id: 3,
        location_id: 3,
        quantity: 25,
        unitPrice: 18.99,
        reorderPoint: 10,
        reorderQuantity: 50,
        leadTimeDays: 2,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 9,
        product_id: 4,
        location_id: 1,
        quantity: 75,
        unitPrice: 39.99,
        reorderPoint: 15,
        reorderQuantity: 30,
        leadTimeDays: 4,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 10,
        product_id: 5,
        location_id: 1,
        quantity: 120,
        unitPrice: 9.99,
        reorderPoint: 30,
        reorderQuantity: 60,
        leadTimeDays: 2,
        created_at: DATE1,
        updated_at: DATE1
      },
      {
        id: 11,
        product_id: 6,
        location_id: 1,
        quantity: 50,
        unitPrice: 29.99,
        reorderPoint: 10,
        reorderQuantity: 20,
        leadTimeDays: 3,
        created_at: DATE1,
        updated_at: DATE1
      }
    ])

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
        created_at: DATE2
      },
      {
        product_id: 3,
        from_location_id: 1,
        to_location_id: 3,
        quantity: 15,
        movement_type: 'transfer',
        reference_number: 'TRF-002',
        user_id: 1,
        created_at: DATE2
      },
      {
        product_id: 1,
        from_location_id: null,
        to_location_id: 1,
        quantity: 30,
        movement_type: 'purchase',
        reference_number: 'PO-001',
        user_id: 1,
        created_at: DATE2
      },
      {
        product_id: 2,
        from_location_id: null,
        to_location_id: 1,
        quantity: 20,
        movement_type: 'purchase',
        reference_number: 'PO-002',
        user_id: 1,
        created_at: DATE2
      }
    ])

    await queryInterface.bulkInsert('sales_history', [
      {
        id: 1,
        product_id: 1,
        location_id: 1,
        quantity: 5,
        date: '2024-01-01',
        created_at: DATE1,
      },
      {
        id: 2,
        product_id: 1,
        location_id: 1,
        quantity: 3,
        date: '2024-01-02',
        created_at: DATE1,
      },
      {
        id: 3,
        product_id: 2,
        location_id: 1,
        quantity: 10,
        date: '2024-01-03',
        created_at: DATE1,
      },
      {
        id: 4,
        product_id: 2,
        location_id: 2,
        quantity: 7,
        date: '2024-01-04',
        created_at: DATE1,
      },
      {
        id: 5,
        product_id: 3,
        location_id: 1,
        quantity: 2,
        date: '2024-01-05',
        created_at: DATE1,
      },
      {
        id: 6,
        product_id: 3,
        location_id: 2,
        quantity: 4,
        date: '2024-01-06',
        created_at: DATE1,
      },
      {
        id: 7,
        product_id: 1,
        location_id: 2,
        quantity: 6,
        date: '2024-01-07',
        created_at: DATE1,
      },
      {
        id: 8,
        product_id: 2,
        location_id: 1,
        quantity: 8,
        date: '2024-01-08',
        created_at: DATE1,
      },
      {
        id: 9,
        product_id: 3,
        location_id: 2,
        quantity: 1,
        date: '2024-01-09',
        created_at: DATE1,
      },
      {
        id: 10,
        product_id: 1,
        location_id: 1,
        quantity: 9,
        date: '2024-01-10',
        created_at: DATE1,
      },
      {
        id: 11,
        product_id: 2,
        location_id: 2,
        quantity: 5,
        date: '2024-01-11',
        created_at: DATE1,
      },
      {
        id: 12,
        product_id: 3,
        location_id: 1,
        quantity: 3,
        date: '2024-01-12',
        created_at: DATE1,
      },
      {
        id: 13,
        product_id: 1,
        location_id: 2,
        quantity: 2,
        date: '2024-01-13',
        created_at: DATE1,
      },
      {
        id: 14,
        product_id: 2,
        location_id: 1,
        quantity: 4,
        date: '2024-01-14',
        created_at: DATE1,
      },
      {
        id: 15,
        product_id: 3,
        location_id: 2,
        quantity: 6,
        date: '2024-01-15',
        created_at: DATE1,
      },
      {
        id: 16,
        product_id: 1,
        location_id: 1,
        quantity: 7,
        date: '2024-01-16',
        created_at: DATE1,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales_history', null, {})
    await queryInterface.bulkDelete('movements', null, {})
    await queryInterface.bulkDelete('inventory', null, {})
    await queryInterface.bulkDelete('products', null, {})
    await queryInterface.bulkDelete('locations', null, {})
    await queryInterface.bulkDelete('categories', null, {})
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('companies', null, {})
  }
}
