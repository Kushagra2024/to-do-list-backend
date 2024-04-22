const {
	handleAddTask,
	handleGetTask,
	handleDeleteTask,
	handleUpdateTask,
} = require("../controllers/taskController");

const taskRouter = require("express").Router();

taskRouter.get("/", handleGetTask);
taskRouter.post("/", handleAddTask);
taskRouter.delete("/:taskId", handleDeleteTask);
taskRouter.patch("/:taskId", handleUpdateTask);

module.exports = taskRouter;
