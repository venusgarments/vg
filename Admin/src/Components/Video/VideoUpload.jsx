import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_React_BASE_API_URL
const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [videos, setVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [playVideo, setPlayVideo] = useState(null);

  /* ========================
      FETCH ALL VIDEOS
  ======================== */
  const fetchVideos = async () => {
    const res = await axios.get(`${BASE_URL}/api/videos`);
    setVideos(res.data.videos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /* ========================
      HANDLE FILE SELECT
  ======================== */
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ========================
      UPLOAD VIDEO
  ======================== */
  const handleUpload = async () => {
    if (!video) return alert("Select a video");

    const formData = new FormData();
    formData.append("video", video);

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/api/upload-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      setShowUploadModal(false);
      setVideo(null);
      setPreview(null);
      setProgress(0);
      fetchVideos();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ========================
      DELETE VIDEO
  ======================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    await axios.delete(`${BASE_URL}/api/video/${id}`);
    fetchVideos();
  };

return (
  <div className="min-h-screen bg-white p-6 text-black">

    {/* =================== HEADER =================== */}
    <div className="flex justify-between items-center mb-6 border-b border-black pb-3">
      <h1 className="text-2xl font-bold text-black">Video Manager</h1>
      <button
        onClick={() => setShowUploadModal(true)}
        className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
      >
        Upload Video
      </button>
    </div>

    {/* =================== VIDEO TABLE =================== */}
    <div className="bg-white rounded-lg shadow border border-black overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-3 border border-white">#</th>
            <th className="p-3 border border-white">Video</th>
            <th className="p-3 border border-white">Actions</th>
          </tr>
        </thead>
<tbody>
  {videos.map((v, i) => (
    <tr key={v._id} className="border-t hover:bg-gray-100">
      <td className="p-3 border border-black">{i + 1}</td>

      {/* Video Preview Instead of URL */}
      <td className="p-3 border border-black">
        <video
          src={v.url}
          className="w-32 h-20 rounded border border-black object-cover bg-black"
        />
      </td>

      <td className="p-3 border border-black flex gap-3">
        <button
          onClick={() => setPlayVideo(v.url)}
          className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
        >
          Play
        </button>
        <button
          onClick={() => handleDelete(v._id)}
          className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>

    {/* =================== UPLOAD MODAL =================== */}
    {showUploadModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-xl p-6 relative border-2 border-black">

          {/* Close Icon */}
          <button
            onClick={() => setShowUploadModal(false)}
            className="absolute top-3 right-3 text-xl font-bold text-black"
          >
            ✖
          </button>

          <h2 className="text-xl font-semibold mb-4 text-black border-b border-black pb-2">
            Upload Video
          </h2>

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="
              w-full 
              border-2 
              border-black 
              p-2 
              rounded 
              mb-4 
              text-black
              file:bg-black 
              file:text-white 
              file:border-0 
              file:px-4 
              file:py-1
              file:rounded
            "
          />

          {preview && (
            <video
              src={preview}
              controls
              className="w-full rounded mb-3 border-2 border-black"
            />
          )}

          {loading && (
            <div className="w-full bg-gray-300 h-3 rounded mb-3 border border-black">
              <div
                className="bg-black h-3 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <button
            onClick={handleUpload}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    )}

    {/* =================== PLAY MODAL =================== */}
    {playVideo && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-2xl rounded-xl p-4 relative border-2 border-black">

          <button
            onClick={() => setPlayVideo(null)}
            className="absolute top-3 right-3 text-xl font-bold text-black"
          >
            ✖
          </button>

          <video
            src={playVideo}
            controls
            className="w-full rounded border-2 border-black"
          />
        </div>
      </div>
    )}

  </div>
);

};

export default VideoUpload;
