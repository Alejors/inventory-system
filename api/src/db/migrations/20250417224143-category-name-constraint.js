'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('categories', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_category_name'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('categories', 'unique_category_name');
  }
};
