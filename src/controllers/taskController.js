const Task = require("../models/taskModel");
const User = require("../models/userModel");

const handleAddTask = async (req, res) => {
	const { title, body } = req.body;
	const userId = req.userId;

	if (!title || !body) {
		return res.json({ error: "Title and Body both are required!" });
	}

	try {
		const createdTask = await Task.create({ title, body, author: userId });

		const user = await User.findById(userId);

		user.tasks.push(createdTask);

		await user.save();

		return res.json({ createdTask });
	} catch (error) {
		console.error("Error while creating task\n", error);
		return res.json({ error });
	}
};

const handleGetTask = async (req, res) => {
	const userId = req.userId;

	try {
		const tasks = await User.findById(userId).populate("tasks");

		return res.json({ tasks });
	} catch (error) {
		console.error("Error while getting tasks list\n", error);
		return res.json({ error });
	}
};

const handleDeleteTask = async (req, res) => {
	const taskId = req.params.taskId;
	const userId = req.userId;

	try {
		const task = await Task.findById(taskId);

		if (!task) {
			return res.json({ error: "task not found!" });
		}

		if (task.author.toString() !== userId) {
			return res.json({ error: "User Not Authorized!" });
		}

		await User.findByIdAndUpdate(userId, {
			$pull: { tasks: taskId },
		});

		await Task.findByIdAndDelete(taskId);

		return res.json({ result: "task successfully deleted!" });
	} catch (error) {
		console.error("Error while deleting task\n", error);
		return res.json({ error });
	}
};

const handleUpdateTask = async (req, res) => {
	const taskId = req.params.taskId;
	const userId = req.userId;
	const { title, body } = req.body;

	try {
		const task = await Task.findById(taskId);

		if (!task) {
			return res.json({ error: "task not found!" });
		}

		if (task.author.toString() !== userId) {
			return res.json({ error: "User Not Authorized!" });
		}

		const updatedTask = await Task.findByIdAndUpdate(
			taskId,
			{
				title,
				body,
			},
			{ new: true }
		);

		return res.json({ updatedTask });
	} catch (error) {
		console.error("Error while updating task\n", error);
		return res.json({ error });
	}
};

module.exports = {
	handleAddTask,
	handleGetTask,
	handleDeleteTask,
	handleUpdateTask,
};
