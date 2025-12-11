import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_React_BASE_API_URL;

const HomeVideoSlider = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [playVideo, setPlayVideo] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const playerRef = useRef(null);

  // ================= FETCH VIDEOS =================
  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/videos`);
      setVideos(data.videos || []);
    } catch (err) {
      console.error("Video fetch failed:", err);
    }
  };

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/products?pageSize=4&sort=best_selling`
      );
      setRecommendedProducts(data.content || []);
    } catch (err) {
      console.error("Products fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchProducts();
  }, []);

  // Stop & reset player; used when closing the modal
  const stopAndResetPlayer = () => {
    const vid = playerRef.current;
    if (vid) {
      try {
        vid.pause();
        // reset to start so audio doesn't linger and to start fresh next time
        vid.currentTime = 0;
        // unload source (optional) to free memory
        // vid.removeAttribute("src");
        // vid.load();
      } catch (e) {
        // some browsers may throw if video not ready; ignore
      }
    }
  };

  const handleClosePlayer = () => {
    stopAndResetPlayer();
    setPlayVideo(null);
  };

  // If playVideo becomes null (e.g. modal closed elsewhere), ensure we stop the player
  useEffect(() => {
    if (!playVideo) stopAndResetPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playVideo]);

  // Optional: prevent background scroll while modal open
  useEffect(() => {
    if (playVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [playVideo]);

  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-28 text-center relative overflow-hidden"
      style={{ backgroundColor: "#FFF9E8" }}
    >
      <div className="absolute top-10 right-10 w-56 sm:w-72 md:w-80 lg:w-96 h-56 sm:h-72 md:h-80 lg:h-96 bg-[#CBE600]/10 rounded-full blur-3xl" />

      {/* ================= HEADING ================= */}
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12 md:mb-16 relative z-10"
        data-aos="fade-up"
      >
        <span
          className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs tracking-widest font-medium mb-3 sm:mb-4 md:mb-5"
          style={{ backgroundColor: "#CBE600", color: "white" }}
        >
          TRENDING VIDEOS
        </span>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-4 sm:mb-5 md:mb-6 px-4"
          style={{ color: "#CBE600", letterSpacing: "0.06em" }}
        >
          STYLE IN MOTION
        </h2>
      </div>

      {/* ================= MARQUEE VIDEO SLIDER ================= */}
      <div className="w-full py-6 sm:py-8 md:py-10 relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-20 md:w-24 bg-linear-to-r from-[#FFF9E8] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-20 md:w-24 bg-linear-to-l from-[#FFF9E8] to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 items-stretch">
          {[...videos, ...videos].map((video, idx) => (
            <article
              key={idx}
              className="group relative w-48 sm:w-56 md:w-64 lg:w-72 shrink-0 cursor-pointer"
              onClick={() => setPlayVideo(video.url)}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-[#DFF200] group-hover:border-[#CBE600] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Video Thumbnail */}
                <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden">
                  <video
                    src={video.url}
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <button className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-bold uppercase rounded-full bg-[#DFF200] text-[#222426] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Play Video
                  </button>
                </div>

                <div className="py-3 sm:py-4 text-center bg-linear-to-b from-white to-gray-50">
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#222426] uppercase tracking-wider">
                    Fashion Reel
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ================= PLAY MODAL ================= */}
      {playVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={handleClosePlayer}
        >
          {/* Complete Modal Wrapper - Scrollable on mobile */}
          <div
            className="relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row w-auto max-h-[90vh] overflow-y-auto animate-modal-pop mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side - Video */}
            <div className="relative bg-black shrink-0 w-full lg:w-auto">
              <video
                ref={playerRef}
                src={playVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-[50vh] sm:h-[60vh] lg:h-[85vh] lg:w-auto object-contain"
                style={{ aspectRatio: "9/16" }}
              />
            </div>

            {/* Right Side - Bestsellers/Shop the Look (Shows on all screens) */}
            <div className="flex flex-col w-full lg:w-[380px] bg-white">
              {/* Header with Brand + Close Button */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#DFF200] to-[#CBE600] flex items-center justify-center shadow-sm">
                    <span className="text-[#111111] font-bold text-xs sm:text-sm">
                      VG
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block text-sm sm:text-base">
                      venusgarments
                    </span>
                    <span className="text-xs text-gray-500">
                      Venus Garments
                    </span>
                  </div>
                </div>
                {/* Close Button */}
                <button
                  onClick={handleClosePlayer}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-base sm:text-lg transition-all duration-200 cursor-pointer"
                  aria-label="Close video"
                >
                  ✕
                </button>
              </div>

              {/* Caption */}
              <div className="px-6 py-4 border-b border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Discover our latest collection! Premium quality, trendy
                  designs at best prices 🛍️✨
                </p>
                <button className="text-sm text-gray-400 mt-2 hover:text-gray-600 transition-colors">
                  See more
                </button>
              </div>

              {/* Shop the Look / Bestsellers */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2 sm:pb-3">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Bestsellers
                </h3>
                <button
                  onClick={() => {
                    handleClosePlayer();
                    navigate("/bestseller");
                  }}
                  className="text-xs sm:text-sm text-[#8A6F4F] font-medium hover:underline"
                >
                  View All →
                </button>
              </div>

              {/* Products List - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                {recommendedProducts.length > 0 ? (
                  recommendedProducts.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => {
                        handleClosePlayer();
                        navigate(`/product/${product._id}`);
                      }}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#CBE600] hover:shadow-md transition-all cursor-pointer group"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-20 rounded-lg shrink-0 overflow-hidden bg-gray-100">
                        <img
                          src={product.imageUrl?.[0] || product.image}
                          alt={product.title || product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 leading-tight group-hover:text-[#8A6F4F] transition-colors line-clamp-2">
                          {product.title || product.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 capitalize">
                          {product.category?.name ||
                            product.topLevelCategory ||
                            "Fashion"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-bold text-gray-900">
                            ₹{product.discountedPrice || product.price}
                          </span>
                          {product.price !== product.discountedPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#8A6F4F] mt-2 flex items-center gap-1 font-medium group-hover:underline">
                          View product <span className="text-sm">→</span>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 text-sm py-4">
                    Loading products...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL ANIMATION ================= */}
      <style>
        {`
          @keyframes modal-pop {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          .animate-modal-pop {
            animation: modal-pop 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* ================= MARQUEE KEYFRAMES ================= */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default HomeVideoSlider;
