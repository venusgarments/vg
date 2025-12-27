// models/Video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    socialUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Video = mongoose.model("videos", videoSchema);

module.exports = Video;
