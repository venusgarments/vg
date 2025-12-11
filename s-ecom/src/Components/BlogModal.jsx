import React, { useState } from "react";

/**
 * BlogModal - A reusable modal component to display blog post details
 *
 * @param {Object} blog - The blog object to display
 * @param {Function} onClose - Callback function to close the modal
 * @param {Function} formatDate - Function to format the date string
 */
const BlogModal = ({ blog, onClose, formatDate }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!blog) return null;

  const hasImages = blog.images && blog.images.length > 0;
  const hasMultipleImages = blog.images && blog.images.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 bg-white/90 hover:bg-[#DFF200] rounded-full shadow-lg transition-all duration-300"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#111111]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Main Blog Image */}
        {hasImages && (
          <div className="relative bg-gray-100">
            <img
              src={blog.images[selectedImageIndex]}
              alt={blog.title}
              className="w-full max-h-[50vh] sm:max-h-[60vh] object-contain transition-all duration-300"
            />
          </div>
        )}

        {/* Thumbnail Gallery - Below Main Image */}
        {hasMultipleImages && (
          <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {blog.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImageIndex === idx
                      ? "ring-3 ring-[#CBE600] shadow-lg scale-105"
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${blog.title} - ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImageIndex === idx && (
                    <div className="absolute inset-0 border-2 border-[#CBE600] rounded-lg"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Date & Author */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <span className="flex items-center gap-1 sm:gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBE600]"
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
            <span className="flex items-center gap-1 sm:gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBE600]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {blog.author}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#111111] mb-4 sm:mb-6 break-words">
            {blog.title}
          </h2>

          {/* Summary */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 italic border-l-4 border-[#CBE600] pl-3 sm:pl-4 break-words">
            {blog.summary}
          </p>

          {/* Content */}
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
            {blog.content}
          </div>
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default BlogModal;
