const db = require("../models");
const { QueryTypes } = require("sequelize");
const sequelize = db.sequelize;
const jwt = require("jsonwebtoken");
const Movies = db.movies;


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
		Movies.findAll({
			where: {
				id: req.body.data,
			},
		})
			.then((data) => res.status(200).send(data))
			.catch((e) => res.send({ error: e }));
	});
	app.get("/api/movies/userpurchased", (req, res) => {
		const jwttoken = req.headers.token;
		const userDetails = jwt.verify(jwttoken, process.env.JWT_SECRET);
		Movies.findAll({
			where: {
				purchasedby: userDetails.id.toString()
			}
		})
			.then((data) => res.status(200).send(data))
			.catch((e) => res.send({ error: e }));
	})
	app.get("/api/movies/checkexpiration", (req, res) => {
		sequelize
			.query("SELECT id, purchasedtill FROM movies WHERE purchasedby != 'null';", { type: QueryTypes.SELECT })
			.then((data) => {
				data.forEach(item => {
					if (new Date().getTime() >= new Date(item.purchasedtill).getTime()) {
						Movies.update({ purchasedby: 'null', purchasedtill: 'null' }, {
							where: { id: item.id }
						})
					}
				});
				res.send("Done")
			})
			.catch((e) => res.send({ error: e }));
	})
};
