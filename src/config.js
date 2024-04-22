require("dotenv").config();

const _config = {
	PORT: process.env.PORT,
	MONGODB_URI: process.env.MONGODB_URI,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
	CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
};

const config = Object.freeze(_config);

module.exports = config;
