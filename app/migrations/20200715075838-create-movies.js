'use strict';
//  sequelize model:create --name movies --attributes 
//  title:string, year:integer, type:string, imdb:string,
//  tmdb:string, image:string, purchasedby:string, purchasedtill:string'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imdb: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tmdb: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      purchasedby: {
        type: DataTypes.STRING,
        defaultValue: "null",
      },
      purchasedtill: {
        type: DataTypes.STRING,
        defaultValue: "null",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('movies');
  }
};