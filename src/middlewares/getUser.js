const config = require("../config");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getUser = async (req, res, next) => {
	const jwtToken =
		req?.headers?.authorization?.split(" ")[1] || req.cookies.accessToken;

	if (!jwtToken) {
		res.locals.user = null;

		return next();
	}

	try {
		const decodedToken = await jwt.verify(jwtToken, config.JWT_SECRET_KEY);

		const userId = decodedToken.userId;

		const user = await User.findById(userId);

		res.locals.user = user;

		return next();
	} catch (error) {
		res.locals.user = null;

		return next();
	}
};

module.exports = getUser;
