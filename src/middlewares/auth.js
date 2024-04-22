const jwt = require("jsonwebtoken");
const config = require("../config");

const isUserAuthenticated = async (req, res, next) => {
	const jwtToken =
		req?.headers?.authorization?.split(" ")[1] || req.cookies.accessToken;

	if (!jwtToken) {
		req.session.requestedUrl = req.originalUrl;

		return res.redirect("/api/users/login");

		// return res.json({ error: "Authorization token is required" });
	}

	try {
		const decodedToken = await jwt.verify(jwtToken, config.JWT_SECRET_KEY);

		const userId = decodedToken.userId;

		req.userId = userId;

		next();
	} catch (error) {
		console.error("Authorization Token verification failed");
		console.error({ error });

		req.session.requestedUrl = req.orignalUrl;

		return res.redirect("/api/users/login");

		// return res.json({ error: "Authorization Token verification failed" });
	}
};

module.exports = isUserAuthenticated;
