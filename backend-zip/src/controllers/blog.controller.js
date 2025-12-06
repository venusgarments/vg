const blogServices = require("../services/blog.services");

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const files = req.files ? req.files.images || req.files || [] : [];
    const { title, summary, content, author } = req.body;

    if (!title || !summary || !content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await blogServices.createBlog({
      title,
      summary,
      content,
      author,
      files,
    });

    return res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    const status = err.status || 500;
    return res
      .status(status)
      .json({ message: err.message || "Something went wrong" });
  }
};

// Get all blogs with pagination and search
const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const data = await blogServices.getAllBlogs({
      page: Number(page),
      limit: Number(limit),
      search,
    });
    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Something went wrong" });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogServices.getBlogById(id);
    return res.status(200).json(blog);
  } catch (err) {
    const status = err.status || 500;
    return res
      .status(status)
      .json({ message: err.message || "Something went wrong" });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files ? req.files.images || req.files || [] : [];
    const { title, summary, content, author, existingImages } = req.body;

    // Parse existingImages if it's a JSON string
    let parsedExistingImages = [];
    if (existingImages) {
      try {
        parsedExistingImages =
          typeof existingImages === "string"
            ? JSON.parse(existingImages)
            : existingImages;
      } catch (e) {
        parsedExistingImages = [];
      }
    }

    const blog = await blogServices.updateBlog(id, {
      title,
      summary,
      content,
      author,
      files,
      existingImages: parsedExistingImages,
    });

    return res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    const status = err.status || 500;
    return res
      .status(status)
      .json({ message: err.message || "Something went wrong" });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogServices.deleteBlog(id);
    return res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    return res
      .status(status)
      .json({ message: err.message || "Something went wrong" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
