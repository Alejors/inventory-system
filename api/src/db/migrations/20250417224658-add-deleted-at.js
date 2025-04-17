'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })

    await queryInterface.addColumn('users', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })

    await queryInterface.addColumn('products', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })

    await queryInterface.addColumn('locations', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })

    await queryInterface.addColumn('movements', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })

    await queryInterface.addColumn('sales_history', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })

    await queryInterface.addColumn('predictions', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'deleted_at');
    await queryInterface.removeColumn('users', 'deleted_at');
    await queryInterface.removeColumn('products', 'deleted_at');
    await queryInterface.removeColumn('locations', 'deleted_at');
    await queryInterface.removeColumn('movements', 'deleted_at');
    await queryInterface.removeColumn('sales_history', 'deleted_at');
    await queryInterface.removeColumn('predictions', 'deleted_at');
  }
}
