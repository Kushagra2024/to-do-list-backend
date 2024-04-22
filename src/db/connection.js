const mongoose = require("mongoose");
const config = require("../config");

const MONGODB_URI = config.MONGODB_URI || "mongodb://127.0.0.1:27017/todo-list";

const connectDB = async () => {
	try {
		mongoose.connection.on("connected", () => {
			console.log("Connected to MongoDB Successfully..");
		});

		mongoose.connection.on("error", (error) => {
			console.error("MongoDB connection error. ", error);
		});

		await mongoose.connect(`${MONGODB_URI}`);
	} catch (error) {
		console.error("MongoDB connection Failed. ");
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
