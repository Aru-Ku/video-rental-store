"use strict";

const Sequelize = require("sequelize");

const db = {};
// console.log(config.PASSWORD);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: "localhost",
	dialect: "postgres",
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movies = require("./movies.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
module.exports = db;
