"use strict";
// SEED Initial Data: sequelize-cli db:seed:all

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const initialData = require("../moviesdataset.json");
		const movieData = [];
		initialData.forEach((movie) => {
			movieData.push({
				id: initialData["id"],
				title: initialData["title"],
				year: initialData["year"],
				type: initialData["type"],
				imdb: initialData["imdb"],
				tmdb: initialData["tmdb"],
				image: initialData["image"],
			});
		});
		return queryInterface.bulkInsert("movies", initialData);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("movies", null, {});
	},
};
