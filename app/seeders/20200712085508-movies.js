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
				genres: initialData["genres"],
				imdb: initialData["imdb"],
				tmdb: initialData["tmdb"],
				imageLink: initialData["imageLink"],
			});
		});
		return queryInterface.bulkInsert("movies", initialData);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("movies", null, {});
	},
};
