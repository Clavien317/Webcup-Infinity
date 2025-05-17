const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_req, file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, name);
  }
});

const fileFilter = (_req, file, cb) => {
  const ok =
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("audio/");
  cb(null, ok);
};

module.exports = multer({ storage, fileFilter });
