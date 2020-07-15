const db = require("../models");
const { QueryTypes } = require("sequelize");
const sequelize = db.sequelize;

module.exports = function (app) {
	app.get("/api/movies/available", (req, res) => {
		sequelize
			.query("SELECT * FROM movies WHERE purchasedby = 'null';", { type: QueryTypes.SELECT })
			.then((data) => {
				res.status(200).send(data);
			})
			.catch((e) => res.send({ error: e }));
	});
	app.post("/api/movies/tocart", (req, res) => {
		db.movies
			.findAll({
				where: {
					id: req.body.data,
				},
			})
			.then((data) => {
				res.status(200).send(data);
			})
			.catch((e) => res.send({ error: e }));
	});
};
