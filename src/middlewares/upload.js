const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.resolve(__dirname, "../../public/data/uploads"));
	},
	filename: (req, file, cb) => {
		const uniqueFileName = Date.now() + "-" + file.originalname;
		cb(null, uniqueFileName);
	},
});

const upload = multer({ storage, limits: { fileSize: 1e7 } });

module.exports = upload;
