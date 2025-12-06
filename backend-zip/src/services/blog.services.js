const Blog = require("../models/blog.model");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    if (file.buffer && file.buffer.length) {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload error:", err?.message || err);
            return reject(err);
          }
          resolve(result);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    } else if (file.path) {
      cloudinary.uploader
        .upload(file.path, options)
        .then(resolve)
        .catch((err) => {
          console.error("Cloudinary upload (path) error:", err?.message || err);
          reject(err);
        });
    } else {
      return reject(new Error("File has neither buffer nor path"));
    }
  });
};

// Create a new blog
const createBlog = async ({ title, summary, content, author, files }) => {
  try {
    let images = [];

    // Upload images to Cloudinary if files are provided
    if (files && files.length > 0) {
      if (files.length > 4) {
        throw { status: 400, message: "Maximum 4 images allowed" };
      }

      const uploadPromises = files.map((file) =>
        uploadToCloudinary(file, { folder: "blogs" })
          .then((r) => ({ ok: true, result: r }))
          .catch((err) => ({ ok: false, err }))
      );

      const uploadResults = await Promise.all(uploadPromises);

      const failed = uploadResults.filter((u) => !u.ok);
      if (failed.length) {
        console.error(`Cloudinary: ${failed.length} uploads failed`);
        throw { status: 500, message: "Image upload failed" };
      }

      images = uploadResults.map((u) => u.result.secure_url || u.result.url);
    }

    const blog = new Blog({
      title,
      summary,
      content,
      author,
      images,
    });

    const savedBlog = await blog.save();
    return savedBlog;
  } catch (error) {
    console.error("Create Blog Error:", error);
    throw error;
  }
};

// Get all blogs with pagination and search
const getAllBlogs = async ({ page = 1, limit = 10, search = "" } = {}) => {
  const skip = (page - 1) * limit;

  const query = search
    ? {
        $or: [
          { title: new RegExp(search, "i") },
          { summary: new RegExp(search, "i") },
          { author: new RegExp(search, "i") },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Blog.countDocuments(query),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

// Get a single blog by ID
const getBlogById = async (blogId) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw { status: 404, message: "Blog not found" };
  }
  return blog;
};

// Update a blog by ID
const updateBlog = async (
  blogId,
  { title, summary, content, author, files, existingImages = [] }
) => {
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw { status: 404, message: "Blog not found" };
    }

    let images = existingImages || [];

    // Upload new images to Cloudinary if files are provided
    if (files && files.length > 0) {
      const totalImages = images.length + files.length;
      if (totalImages > 4) {
        throw { status: 400, message: "Maximum 4 images allowed" };
      }

      const uploadPromises = files.map((file) =>
        uploadToCloudinary(file, { folder: "blogs" })
          .then((r) => ({ ok: true, result: r }))
          .catch((err) => ({ ok: false, err }))
      );

      const uploadResults = await Promise.all(uploadPromises);

      const failed = uploadResults.filter((u) => !u.ok);
      if (failed.length) {
        console.error(`Cloudinary: ${failed.length} uploads failed`);
        throw { status: 500, message: "Image upload failed" };
      }

      const newImageUrls = uploadResults.map(
        (u) => u.result.secure_url || u.result.url
      );
      images = [...images, ...newImageUrls];
    }

    // Update blog fields
    blog.title = title || blog.title;
    blog.summary = summary || blog.summary;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.images = images;

    const updatedBlog = await blog.save();
    return updatedBlog;
  } catch (error) {
    console.error("Update Blog Error:", error);
    throw error;
  }
};

// Delete a blog by ID
const deleteBlog = async (blogId) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw { status: 404, message: "Blog not found" };
  }

  // Optionally delete images from Cloudinary here
  // (would need to extract public_id from URLs)

  await Blog.findByIdAndDelete(blogId);
  return { message: "Blog deleted successfully" };
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
