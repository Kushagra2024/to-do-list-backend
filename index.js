const app = require("./src/app");
const config = require("./src/config");
const connectDB = require("./src/db/connection");
const isUserAuthenticated = require("./src/middlewares/auth");
const getUser = require("./src/middlewares/getUser");
const userRouter = require("./src/routers/userRouter");
const taskRouter = require("./src/routers/taskRoute");

const port = config.PORT || 3000;

connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server listening on port: ${port}`);
		});
	})
	.catch((error) => {
		console.error(error);
	});

app.use(getUser);

app.use("/api/users", userRouter);

app.use("/api/tasks", isUserAuthenticated, taskRouter);

app.get("/", (req, res) => {
	res.render("home");
});
