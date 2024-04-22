const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePic: {
			type: String,
			required: true,
		},
		tasks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Task",
			},
		],
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
