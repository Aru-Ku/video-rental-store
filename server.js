const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

const db = require("./app/models");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("VRS"));
// ROUTES
require("./app/routes/auth")(app);
require("./app/routes/movies")(app);
require("./app/routes/user")(app);

if (process.env.NODE_ENV === "production") {
	// Serve any static files
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client/build", "index.html")));
}

app.listen(port, () => console.log(`Listening on port ${port}`));
