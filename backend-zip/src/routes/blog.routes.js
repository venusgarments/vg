const express = require("express");
const upload = require("../middleware/upload");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const Router = express.Router();

// Create a new blog (with image upload - max 4 images)
Router.post("/create", upload.array("images", 4), createBlog);

// Get all blogs (with pagination and search)
Router.get("/all", getAllBlogs);

// Get a single blog by ID
Router.get("/:id", getBlogById);

// Update a blog by ID (with image upload)
Router.put("/update/:id", upload.array("images", 4), updateBlog);

// Delete a blog by ID
Router.delete("/delete/:id", deleteBlog);

module.exports = Router;
