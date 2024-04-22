const {
	handleGetLogin,
	handleGetRegister,
	handlePostLogin,
	handlePostRegister,
	handleGetLogout,
	handleUpdateProfileImage,
} = require("../controllers/userController");
const isUserAuthenticated = require("../middlewares/auth");

const upload = require("../middlewares/upload");

const userRouter = require("express").Router();

userRouter.get("/login", handleGetLogin);
userRouter.post("/login", handlePostLogin);

userRouter.get("/register", handleGetRegister);
userRouter.post("/register", upload.single("photo"), handlePostRegister);

userRouter.get("/logout", handleGetLogout);

userRouter.patch(
	"/profile/image",
	isUserAuthenticated,
	upload.single("photo"),
	handleUpdateProfileImage
);

module.exports = userRouter;
