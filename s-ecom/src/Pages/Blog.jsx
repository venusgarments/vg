import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import BlogModal from "../Components/BlogModal";

const API_BASE_URL = import.meta.env.VITE_React_BASE_API_URL;

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/blogs/all?limit=20`
        );
        const fetchedBlogs = response.data.items || [];
        setBlogs(fetchedBlogs);
        setError(null);

        // Check if a blog ID was passed from the Home page
        if (location.state?.selectedBlogId) {
          const blogToOpen = fetchedBlogs.find(
            (b) => b._id === location.state.selectedBlogId
          );
          if (blogToOpen) {
            setSelectedBlog(blogToOpen);
            document.body.style.overflow = "hidden";
          }
          // Clear the state so it doesn't re-open on subsequent visits
          window.history.replaceState({}, document.title);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message || "Failed to fetch blogs");
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [location.state]);

  // Refresh AOS when loading completes to animate new content
  useEffect(() => {
    if (!isLoading) {
      AOS.refresh();
    }
  }, [isLoading]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Open blog modal
  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = "hidden";
  };

  // Close blog modal
  const closeBlogModal = () => {
    setSelectedBlog(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      className="min-h-screen py-8 sm:py-12 md:py-16"
      style={{ backgroundColor: "#FFF9E8" }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-3 sm:mb-4">
            Our <span className="text-[#CBE600]">Blog</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Discover the latest fashion trends, styling tips, and updates from
            Venus Garments.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#CBE600] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#CBE600]/20 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#CBE600]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#111111] mb-2">
              No blogs yet
            </h3>
            <p className="text-gray-600">
              Check back soon for exciting content!
            </p>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {blogs.map((blog, index) => (
              <article
                key={blog._id}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div
                  className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#DFF200] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                  onClick={() => openBlogModal(blog)}
                >
                  {/* Blog Image */}
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                    {blog.images && blog.images.length > 0 ? (
                      <img
                        src={blog.images[0]}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#DFF200] to-[#CBE600] flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white/80"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-4 sm:p-5 md:p-6">
                    {/* Date & Author */}
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formatDate(blog.createdAt)}
                      </span>
                      <span className="text-[#CBE600] font-medium">
                        • {blog.author}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#111111] mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#CBE600] transition-colors duration-300 ease-in-out">
                      {blog.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                      {blog.summary}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-1 text-[#CBE600] font-semibold text-sm sm:text-base group-hover:gap-2 sm:group-hover:gap-3 transition-all duration-300 ease-in-out">
                      <span>Read More</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Blog Detail Modal */}
      <BlogModal
        blog={selectedBlog}
        onClose={closeBlogModal}
        formatDate={formatDate}
      />
    </section>
  );
};

export default Blog;
