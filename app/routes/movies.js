const db = require("../models");
const { QueryTypes } = require("sequelize");
const sequelize = db.sequelize;

module.exports = function (app) {
	app.get("/api/movies/available", (req, res) => {
		sequelize.query("SELECT * FROM MOVIES WHERE purchasedby = 'null';", { type: QueryTypes.SELECT }).then((data) => {
			res.status(200).send(data);
		});
	});
};
