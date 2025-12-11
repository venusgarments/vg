// controllers/video.controller.js
const cloudinary = require("../config/cloudinary");
const Video = require("../models/video.model");
const streamifier = require("streamifier");

/* ============================
   ✅ UPLOAD VIDEO
============================ */
exports.uploadVideoController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No video provided" });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "videos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadToCloudinary();

    const savedVideo = await Video.create({
      url: result.secure_url,
      public_id: result.public_id
    });

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: savedVideo
    });

  } catch (error) {
    console.error("Video Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ============================
   ✅ GET ALL VIDEOS
============================ */
exports.getAllVideosController = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: videos.length,
      videos
    });
  } catch (error) {
    console.error("Fetch Video Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ============================
   ✅ DELETE VIDEO (Cloudinary + DB)
============================ */
exports.deleteVideoController = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    // ✅ Delete from Cloudinary
    await cloudinary.uploader.destroy(video.public_id, {
      resource_type: "video"
    });

    // ✅ Delete from MongoDB
    await Video.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Video deleted successfully"
    });
  } catch (error) {
    console.error("Delete Video Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
