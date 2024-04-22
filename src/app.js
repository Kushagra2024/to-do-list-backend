const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		secret: "dsnosndi3309u9sdudv45909", // Set a secret key for session encryption
		resave: false,
		saveUninitialized: true,
	})
);

module.exports = app;
