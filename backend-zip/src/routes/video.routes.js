const express = require("express")
const uploadVideo = require("../middleware/upload.video")
const { uploadVideoController, getAllVideosController, deleteVideoController } = require("../controllers/video.controller")

const Router = express.Router()

Router.post("/upload-video", uploadVideo.single("video"), uploadVideoController);
Router.get("/videos", getAllVideosController);

// ✅ Delete Video
Router.delete("/video/:id", deleteVideoController);

module.exports=Router