const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UPLOADS_FOLDER = path.join(__dirname, "../uploads/");
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append file extension
  },
});

const upload = multer({ storage });
module.exports = upload;
