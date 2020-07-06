const express = require('express')
const path = require('path')
const bodyparser =require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { Sequelize } = require('sequelize');

const db = new Sequelize('test', 'postgres', '123@1234', {
    host: 'localhost',
    dialect: 'postgres'
  });

db.authenticate().then(r => console.log('DB connected')).catch(e => console.log(e))

app.get('/', (req, res) => {
    res.send('ss')
})

if (process.env.NODE_ENV === "production") { // Serve any static files
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client/build", "index.html")));
}

app.listen(port, () => console.log(`Listening on port ${port}`));
