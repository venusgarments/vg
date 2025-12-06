import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import {
  Button,
  CardHeader,
  IconButton,
  Pagination,
  Modal,
  TextField,
  Backdrop,
  Avatar,
  AvatarGroup,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Edit,
  Trash2,
  Plus,
  X,
  Upload,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../Config/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    summary: "",
    content: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const itemsPerPage = 10;

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/blogs/all?page=${page}&limit=${itemsPerPage}`
      );
      setBlogs(response.data.items || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handleCreateBlog = () => {
    setEditingBlog(null);
    setFormData({ author: "", title: "", summary: "", content: "" });
    setSelectedImages([]);
    setImagePreviews([]);
    setExistingImages([]);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingBlog(null);
    setFormData({ author: "", title: "", summary: "", content: "" });
    setSelectedImages([]);
    setImagePreviews([]);
    setExistingImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check max 4 images limit
    const totalImages =
      existingImages.length + imagePreviews.length + files.length;
    if (totalImages > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    // Add new files to existing selection
    setSelectedImages((prev) => [...prev, ...files]);

    // Create preview URLs for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveNewImage = (indexToRemove) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    if (
      imagePreviews[indexToRemove] &&
      imagePreviews[indexToRemove].startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreviews[indexToRemove]);
    }

    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("author", formData.author);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("summary", formData.summary);
      formDataToSend.append("content", formData.content);

      // Add existing images as JSON string
      formDataToSend.append("existingImages", JSON.stringify(existingImages));

      // Add new image files
      selectedImages.forEach((file) => {
        formDataToSend.append("images", file);
      });

      if (editingBlog) {
        // Update existing blog
        await axios.put(
          `${API_BASE_URL}/api/blogs/update/${editingBlog._id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Blog updated successfully");
      } else {
        // Create new blog
        await axios.post(`${API_BASE_URL}/api/blogs/create`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Blog created successfully");
      }

      handleCloseModal();
      fetchBlogs(); // Refresh the list
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(error.response?.data?.message || "Error saving blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (blogId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blogs/${blogId}`);
      const blogToEdit = response.data;

      setEditingBlog(blogToEdit);
      setFormData({
        author: blogToEdit.author || "",
        title: blogToEdit.title || "",
        summary: blogToEdit.summary || "",
        content: blogToEdit.content || "",
      });
      setExistingImages(blogToEdit.images || []);
      setImagePreviews([]);
      setSelectedImages([]);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching blog:", error);
      alert("Error loading blog details");
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  // Confirm and perform delete
  const confirmDelete = async () => {
    if (!blogToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(
        `${API_BASE_URL}/api/blogs/delete/${blogToDelete._id}`
      );
      console.log("Blog deleted successfully");
      fetchBlogs(); // Refresh the list
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert(error.response?.data?.message || "Error deleting blog");
    } finally {
      setIsDeleting(false);
    }
  };

  // Calculate display index
  const startIndex = (page - 1) * itemsPerPage;

  return (
    <Box>
      <Card>
        <CardHeader
          title="All Blogs"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              onClick={handleCreateBlog}
              sx={{
                backgroundColor: "#6A1B9A",
                "&:hover": {
                  backgroundColor: "#4A148C",
                },
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Create Blog
            </Button>
          }
        />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="blogs table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>S.No</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Images
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>
                  Summary
                </TableCell>
                <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>
                  Content
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center", py: 5 }}>
                    <CircularProgress size={40} sx={{ color: "#6A1B9A" }} />
                  </TableCell>
                </TableRow>
              ) : blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <TableRow
                    hover
                    key={blog._id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell align="center">
                      {blog.images && blog.images.length > 0 ? (
                        <Box
                          onClick={() => {
                            setViewerImages(blog.images);
                            setCurrentImageIndex(0);
                            setImageViewerOpen(true);
                          }}
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <AvatarGroup
                            max={3}
                            sx={{
                              justifyContent: "center",
                              "& .MuiAvatar-root": {
                                transition: "transform 0.2s",
                              },
                              "&:hover .MuiAvatar-root": {
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            {blog.images.map((img, idx) => (
                              <Avatar
                                key={idx}
                                src={img}
                                variant="rounded"
                                sx={{ width: 40, height: 40 }}
                              />
                            ))}
                          </AvatarGroup>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            backgroundColor: "#f5f5f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto",
                          }}
                        >
                          <ImageIcon size={20} color="#999" />
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>
                      <Typography
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {blog.author}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 150 }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: "#333",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {blog.title}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 150 }}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          color: "#666",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {blog.summary}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 180 }}>
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          color: "#888",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          fontStyle: "italic",
                        }}
                      >
                        {blog.content}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleEdit(blog._id)}
                        sx={{
                          color: "#1976D2",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.1)",
                          },
                        }}
                      >
                        <Edit size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => openDeleteDialog(blog)}
                        sx={{
                          color: "#D32F2F",
                          "&:hover": {
                            backgroundColor: "rgba(211, 47, 47, 0.1)",
                          },
                        }}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center", py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No blogs found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 flex justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={totalPages}
          page={page}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>

      {/* Create/Edit Blog Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 600 },
            maxHeight: "90vh",
            overflow: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: 600, color: "#333" }}
            >
              {editingBlog ? "Edit Blog" : "Create New Blog"}
            </Typography>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                color: "#666",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              <X size={24} />
            </IconButton>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#6A1B9A",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6A1B9A",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#6A1B9A",
                  },
                }}
              />
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#6A1B9A",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6A1B9A",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#6A1B9A",
                  },
                }}
              />
              <TextField
                label="Summary"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                required
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                placeholder="A brief summary of the blog post..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#6A1B9A",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6A1B9A",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#6A1B9A",
                  },
                }}
              />
              <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                placeholder="Write your full blog content here..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#6A1B9A",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6A1B9A",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#6A1B9A",
                  },
                }}
              />

              {/* Image Upload Section */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 600, color: "#333" }}
                >
                  Blog Images (Max 4)
                </Typography>

                {/* Existing Images (when editing) */}
                {existingImages.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#666", mb: 1, display: "block" }}
                    >
                      Current Images:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                      {existingImages.map((img, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: "relative",
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          <img
                            src={img}
                            alt={`Existing ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveExistingImage(index)}
                            sx={{
                              position: "absolute",
                              top: 2,
                              right: 2,
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              color: "#fff",
                              padding: "2px",
                              "&:hover": {
                                backgroundColor: "rgba(211, 47, 47, 0.9)",
                              },
                            }}
                          >
                            <X size={14} />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Upload Button */}
                {existingImages.length + imagePreviews.length < 4 && (
                  <Box
                    component="label"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #ccc",
                      borderRadius: 2,
                      p: 3,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "#6A1B9A",
                        backgroundColor: "rgba(106, 27, 154, 0.05)",
                      },
                    }}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <Upload size={32} color="#6A1B9A" />
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "#666", textAlign: "center" }}
                    >
                      Click to upload images
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#999", textAlign: "center" }}
                    >
                      PNG, JPG, WEBP (Max 4 images)
                    </Typography>
                  </Box>
                )}

                {/* New Image Previews */}
                {imagePreviews.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#666", mb: 1, display: "block" }}
                    >
                      New Images:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1.5,
                      }}
                    >
                      {imagePreviews.map((preview, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: "relative",
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid #4CAF50",
                          }}
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveNewImage(index)}
                            sx={{
                              position: "absolute",
                              top: 2,
                              right: 2,
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              color: "#fff",
                              padding: "2px",
                              "&:hover": {
                                backgroundColor: "rgba(211, 47, 47, 0.9)",
                              },
                            }}
                          >
                            <X size={14} />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 1,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  sx={{
                    borderColor: "#666",
                    color: "#666",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#333",
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: "#6A1B9A",
                    "&:hover": {
                      backgroundColor: "#4A148C",
                    },
                    textTransform: "none",
                    fontWeight: 600,
                    px: 4,
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                  ) : editingBlog ? (
                    "Update Blog"
                  ) : (
                    "Create Blog"
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Image Viewer Modal (Lightbox) */}
      <Modal
        open={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "80%", md: "70%" },
            maxWidth: 900,
            maxHeight: "90vh",
            outline: "none",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setImageViewerOpen(false)}
            sx={{
              position: "absolute",
              top: -50,
              right: 0,
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <X size={32} />
          </IconButton>

          {/* Image Container */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Previous Button */}
            {viewerImages.length > 1 && (
              <IconButton
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? viewerImages.length - 1 : prev - 1
                  )
                }
                sx={{
                  position: "absolute",
                  left: { xs: -20, sm: -60 },
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <ChevronLeft size={32} />
              </IconButton>
            )}

            {/* Main Image */}
            <Box
              component="img"
              src={viewerImages[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              sx={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />

            {/* Next Button */}
            {viewerImages.length > 1 && (
              <IconButton
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === viewerImages.length - 1 ? 0 : prev + 1
                  )
                }
                sx={{
                  position: "absolute",
                  right: { xs: -20, sm: -60 },
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <ChevronRight size={32} />
              </IconButton>
            )}
          </Box>

          {/* Image Counter */}
          {viewerImages.length > 1 && (
            <Typography
              sx={{
                textAlign: "center",
                color: "#fff",
                mt: 2,
                fontSize: "0.9rem",
              }}
            >
              {currentImageIndex + 1} / {viewerImages.length}
            </Typography>
          )}

          {/* Thumbnail Navigation */}
          {viewerImages.length > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                mt: 2,
              }}
            >
              {viewerImages.map((img, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    border:
                      idx === currentImageIndex
                        ? "2px solid #6A1B9A"
                        : "2px solid transparent",
                    opacity: idx === currentImageIndex ? 1 : 0.6,
                    transition: "all 0.2s",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 400,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            pb: 1,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "rgba(211, 47, 47, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertTriangle size={24} color="#D32F2F" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete Blog
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#666", mb: 2 }}>
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </Typography>
          {blogToDelete && (
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                p: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#333" }}
              >
                {blogToDelete.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
                by {blogToDelete.author}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={closeDeleteDialog}
            disabled={isDeleting}
            sx={{
              color: "#666",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            disabled={isDeleting}
            variant="contained"
            sx={{
              backgroundColor: "#D32F2F",
              "&:hover": {
                backgroundColor: "#B71C1C",
              },
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            {isDeleting ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "Delete Blog"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Blogs;
