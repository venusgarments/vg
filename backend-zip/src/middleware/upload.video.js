// middleware/uploadVideo.js
const multer = require("multer");

const storage = multer.memoryStorage();

const uploadVideo = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Only video files are allowed"));
  }
});

module.exports = uploadVideo;
