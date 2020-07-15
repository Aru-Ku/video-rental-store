'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bonuspoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      cart: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        allowNull: true,
      },
      purchased: {
        type: Sequelize.ARRAY(Sequelize.BIGINT),
        allowNull: true,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};