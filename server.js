const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
	// Serve any static files
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client/build", "index.html")));
}

app.listen(port, () => console.log(`Listening on port ${port}`));
