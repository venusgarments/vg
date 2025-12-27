import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_React_BASE_API_URL;

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [socialUrl, setSocialUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [videos, setVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // Renamed from playVideo for clarity

  /* ========================
      FETCH ALL VIDEOS
  ======================== */
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/videos`);
      setVideos(res.data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /* ========================
      HANDLE INPUTS
  ======================== */
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const resetForm = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setDescription("");
    setSocialUrl("");
    setProgress(0);
    setShowUploadModal(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (video) => {
    setDescription(video.description || "");
    setSocialUrl(video.socialUrl || "");
    setVideoPreview(video.url); // Show existing video as preview
    setEditId(video._id);
    setIsEditing(true);
    setShowUploadModal(true);
  };

  /* ========================
      UPLOAD / UPDATE VIDEO
  ======================== */
  const handleUpload = async () => {
    if (!isEditing && !videoFile) return alert("Select a video");

    try {
      setLoading(true);

      if (isEditing) {
        // UPDATE EXISTING VIDEO
        await axios.put(`${BASE_URL}/api/video/${editId}`, {
          description,
          socialUrl: socialUrl.trim(),
        });
        alert("Video updated successfully");
      } else {
        // CREATE NEW VIDEO
        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("description", description);
        formData.append("socialUrl", socialUrl.trim());

        await axios.post(`${BASE_URL}/api/upload-video`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
          },
        });
      }

      resetForm();
      fetchVideos();
    } catch (err) {
      console.error("Upload/Update failed", err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ========================
      DELETE VIDEO
  ======================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/video/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      {/* =================== HEADER =================== */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Manager</h1>
          <p className="text-gray-500 mt-1">
            Manage your website's video content
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowUploadModal(true);
          }}
          className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium"
        >
          <span>+</span> Upload Video
        </button>
      </div>

      {/* =================== VIDEO TABLE =================== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="p-4 border-b border-gray-200 w-16 text-center">
                #
              </th>
              <th className="p-4 border-b border-gray-200">Preview</th>
              <th className="p-4 border-b border-gray-200">Description</th>
              <th className="p-4 border-b border-gray-200">Social Link</th>
              <th className="p-4 border-b border-gray-200 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {videos.map((v, i) => (
              <tr key={v._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-center text-gray-500">{i + 1}</td>

                <td className="p-4">
                  <div
                    className="relative w-32 h-20 rounded-lg overflow-hidden bg-black group cursor-pointer"
                    onClick={() => setSelectedVideo(v)}
                  >
                    <video
                      src={v.url}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-yellow-100 to-yellow-50 flex items-center justify-center mb-4">
                      <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                        <svg
                          className="w-4 h-4 text-white fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-4 max-w-xs">
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {v.description || (
                      <span className="text-gray-400 italic">
                        No description
                      </span>
                    )}
                  </p>
                </td>

                <td className="p-4">
                  {v.socialUrl ? (
                    <a
                      href={v.socialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      Link
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>

                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedVideo(v)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View & Play"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEdit(v)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                      title="Edit"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {videos.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No videos uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =================== UPLOAD / EDIT MODAL =================== */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? "Edit Video Details" : "Upload Video"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* File Input - Only show if not editing, or allow replace? Use case implies editing details primarily */}
              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video File
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition-all cursor-pointer"
                  />
                </div>
              )}

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter video description..."
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none h-24"
                />
              </div>

              {/* Social Link Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Media Link (Optional)
                </label>
                <input
                  type="url"
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                  placeholder="https://example.com/..."
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Preview */}
              {videoPreview && (
                <div className="border rounded-lg overflow-hidden bg-black aspect-video ">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Progress Bar */}
              {loading && (
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-2.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <p className="text-xs text-center mt-1 text-gray-500">
                    {progress}% Uploaded
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleUpload}
                disabled={loading || (!isEditing && !videoFile)}
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : isEditing
                  ? "Update Video"
                  : "Upload Video"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================== VIEW/PLAY MODAL =================== */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur p-4">
          <div className="bg-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh]">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 bg-black/50 rounded-full p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Player Section */}
            <div className="w-full md:w-2/3 bg-black flex items-center justify-center">
              <video
                src={selectedVideo.url}
                controls
                autoPlay
                className="max-w-full max-h-[60vh] md:max-h-full"
              />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/3 bg-white p-6 flex flex-col overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                Video Details
              </h3>

              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Description
                  </h4>
                  <p className="text-gray-800 mt-1 whitespace-pre-wrap">
                    {selectedVideo.description || "No description available."}
                  </p>
                </div>

                {selectedVideo.socialUrl && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Social
                    </h4>
                    <a
                      href={
                        selectedVideo.socialUrl.startsWith("http")
                          ? selectedVideo.socialUrl
                          : `https://${selectedVideo.socialUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      Visit Link
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
