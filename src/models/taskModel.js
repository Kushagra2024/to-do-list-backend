const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Task = model("Task", taskSchema);

module.exports = Task;
