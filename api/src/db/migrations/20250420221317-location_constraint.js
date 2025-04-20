'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('locations', {
      fields: ['name', 'address'],
      type: 'unique',
      name: 'unique_name_address'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('locations', 'unique_name_address');
  }
};