const db = require("../models");
const jwt = require("jsonwebtoken");
const Users = db.users;
const Movies = db.movies;

module.exports = function (app) {
	app.post("/api/user/updatecart", (req, res) => {
		const jwttoken = req.headers.token;
		const userDetails = jwt.verify(jwttoken, process.env.JWT_SECRET);
		Users.update({ cart: req.body.data }, {
			where: { id: userDetails.id },
		})
			.then(() => res.status(200).send({ message: "success" }))
			.catch(() => res.status(200).send({ error: "Not Updated" }));
	});
	app.get("/api/user/fetchcart", (req, res) => {
		const jwttoken = req.headers.token;
		const userDetails = jwt.verify(jwttoken, process.env.JWT_SECRET);
		db.sequelize
			.query(`SELECT (cart) FROM users WHERE id = ${userDetails.id}`)
			.then((data) => res.send(data[0][0].cart))
			.catch(() => res.status(200).send({ error: "No Items in cart" }));
	});
	app.post("/api/user/makepurchase", (req, res) => {
		const jwttoken = req.headers.token;
		const userDetails = jwt.verify(jwttoken, process.env.JWT_SECRET);
		const { purchaseDetails, bonusPoints } = req.body;
		let currentIds = [];
		let previousIds = [];

		Users.findAll({
			attributes: ['purchased'],
			where: { id: userDetails.id }
		}).then((data) => previousIds = data[0].purchased)
			.then(() => {
				purchaseDetails.forEach(item => {
					currentIds.push(item.id)
					Movies.update({ purchasedby: userDetails.id, purchasedtill: item.till }, {
						where: { id: item.id }
					})
				});
				purchasedIds = currentIds.concat(previousIds);
				Users.update({ cart: [], purchased: purchasedIds, bonuspoints: bonusPoints }, {
					where: { id: userDetails.id }
				}).then(() => res.status(200).send({ message: "success" }))
					.catch(() => res.status(200).send({ error: "Not Updated" }));
			})
	})
	app.get("/api/user/getbonuspoints", (req, res) => {
		const jwttoken = req.headers.token;
		const userDetails = jwt.verify(jwttoken, process.env.JWT_SECRET);
		Users.findAll({
			attributes: ['bonuspoints'],
			where: { id: userDetails.id }
		}).then((data) => res.send({ bonuspoints: data[0].bonuspoints }))
			.catch(() => res.status(200).send({ error: "Not Found" }));
	});
};
