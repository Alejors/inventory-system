'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE users
      ADD COLUMN companyId INTEGER NULL 
      AFTER password;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users
      ADD CONSTRAINT fk_company
      FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE locations
      ADD COLUMN companyId INTEGER NOT NULL 
      AFTER id;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE locations
      ADD CONSTRAINT fk_company_location
      FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE;
    `);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('locations', 'fk_company_location');
    await queryInterface.removeConstraint('users', 'fk_company');
    await queryInterface.removeColumn('locations', 'companyId');
    await queryInterface.removeColumn('users', 'companyId');
    await queryInterface.dropTable('companies');
  }
};
