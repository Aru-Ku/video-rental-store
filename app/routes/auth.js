const db = require("../models");
const Users = db.users;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (app) {
	app.post("/api/signup", (req, res) => {
		Users.create({ email: req.body.email, password: bcrypt.hashSync(req.body.password, 8), fullname: req.body.fullname })
			.then((user) => {
				var token = jwt.sign({ id: user.id, email: user.email, name: user.fullname }, jwtSecret, {
					expiresIn: 86400,
				});
				res.status(200).send({
					token: token,
				});
			})
			.catch((e) => {
				if (e["name"] === "SequelizeUniqueConstraintError") {
					res.send({ error: "Email already registered" });
				}
			});
	});
	app.post("/api/login", (req, res) => {
		Users.findOne({
			where: { email: req.body.email },
		})
			.then((user) => {
				if (!user) return res.status(200).send({ error: "User not found" });
				var isPasswordMatched = bcrypt.compareSync(req.body.password, user.password);
				if (!isPasswordMatched) return res.status(200).send({ error: "Wrong Password" });
				var token = jwt.sign({ id: user.id, email: user.email, name: user.fullname }, jwtSecret, {
					expiresIn: 86400, // 24 hours
				});
				res.status(200).send({
					token: token,
				});
			})
			.catch((e) => console.log("error", e));
	});
};
