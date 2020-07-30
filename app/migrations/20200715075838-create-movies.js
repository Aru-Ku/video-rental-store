"use strict";
//  sequelize model:create --name movies --attributes
//  title:string, year:integer, type:string, imdb:string,
//  tmdb:string, image:string, purchasedby:string, purchasedtill:string'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("movies", {
			id: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				allowNull: false,
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
				type: Sequelize.STRING,
			},
			purchasedtill: {
				type: Sequelize.STRING,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("movies");
	},
};
