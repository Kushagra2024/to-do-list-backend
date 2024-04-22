const fs = require("fs");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const cloudinary = require("../cloudinary");

const handleGetLogin = (req, res) => {
	res.render("login");
};

const handlePostLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.json({ error: "user not registered" });
		}

		const isMatched = await bcrypt.compare(password, user.password);

		if (!isMatched) {
			return res.json({ error: "invalid email or password" });
		}

		const token = jwt.sign({ userId: user._id }, config.JWT_SECRET_KEY, {
			expiresIn: "3d",
		});

		res.cookie("accessToken", token, {
			maxAge: 1000 * 60 * 60 * 24 * 3,
			httpOnly: true,
		});

		const requestedUrl = req.session.requestedUrl || "/";
		delete req.session.requestedUrl;

		return res.json({ accessToken: token, requestedUrl });
	} catch (error) {
		console.log("Login Failed", error);
		res.json({ error });
	}
};

const handleGetRegister = (req, res) => {
	return res.render("register");
};

const handlePostRegister = async (req, res) => {
	const { name, email, password } = req.body;
	const photo = req.file;

	// validation
	if (!name || !email || !password || !photo) {
		return res.json({ error: "All fields are required" });
	}

	try {
		// checking if user already exists
		const user = await User.findOne({ email });

		if (user) {
			return res.json({ error: "user already exist" });
		}

		const filePath = photo.path;
		const fileName = photo.filename;
		const photoMIMEType = photo.mimetype.split("/").at(-1);

		const uploadresult = await cloudinary.uploader.upload(filePath, {
			filename_override: fileName,
			folder: "profile-pic",
			format: photoMIMEType,
		});

		// creating new user otherwise
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			profilePic: uploadresult.secure_url,
		});

		await fs.promises.unlink(filePath);

		// creating JWT token
		const token = jwt.sign({ userId: newUser._id }, config.JWT_SECRET_KEY, {
			expiresIn: "3d",
		});

		res.cookie("accessToken", token, {
			maxAge: 1000 * 60 * 60 * 24 * 3,
			httpOnly: true,
		});

		return res.json({ accessToken: token });
	} catch (error) {
		console.error("Error while registering: ", error);
		return res.json({ error });
	}
};

const handleGetLogout = (req, res) => {
	res.cookie("accessToken", "", {
		maxAge: 0,
		httpOnly: true,
	});

	return res.redirect("/");
};

const handleUpdateProfileImage = async (req, res) => {
	const photo = req.file;

	try {
		const userId = req.userId;

		const user = await User.findById(userId);

		const splitSecureURL = user.profilePic.split("/");

		const imagePublicId = `${splitSecureURL.at(-2)}/${
			splitSecureURL.at(-1).split(".")[0]
		}`;

		const { result } = await cloudinary.uploader.destroy(imagePublicId);

		if (result === "not found")
			console.error("Please provide correct public_id");
		if (result !== "ok") console.error("Try again later.");

		const filePath = photo.path;

		const uploadResult = await cloudinary.uploader.upload(filePath, {
			public_id: imagePublicId,
		});

		await fs.promises.unlink(filePath);

		const updatedProfile = await User.findByIdAndUpdate(userId, {
			profilePic: uploadResult.secure_url,
		});

		return res.json({ userId: updatedProfile._id });
	} catch (error) {
		console.error("Error while updating profile image: ", error);
		return res.json({ error });
	}
};

module.exports = {
	handleGetLogin,
	handlePostLogin,
	handleGetRegister,
	handlePostRegister,
	handleGetLogout,
	handleUpdateProfileImage,
};
