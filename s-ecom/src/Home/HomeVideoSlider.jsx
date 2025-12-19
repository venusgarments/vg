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

  // Scroll / drag refs & state
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const rafRef = useRef(null);
  const isAutoScrollPausedRef = useRef(false);

  // Auto-scroll speed (pixels per frame). Tune to taste.
  const AUTO_SCROLL_SPEED = 0.6;

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

  // ================= VIDEO PLAYER HELPERS =================
  const stopAndResetPlayer = () => {
    const vid = playerRef.current;
    if (vid) {
      try {
        vid.pause();
        vid.currentTime = 0;
      } catch (e) {}
    }
  };

  const handleClosePlayer = () => {
    stopAndResetPlayer();
    setPlayVideo(null);
  };

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

  // ================= DRAG HANDLERS (mouse) =================
  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    isAutoScrollPausedRef.current = true;
    el.classList.add("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1; // drag speed multiplier
    el.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    isAutoScrollPausedRef.current = false;
    const el = scrollRef.current;
    if (el) el.classList.remove("cursor-grabbing");
  };

  // ================= TOUCH HANDLERS =================
  const handleTouchStart = () => {
    isAutoScrollPausedRef.current = true;
  };
  const handleTouchEnd = () => {
    setTimeout(() => {
      isAutoScrollPausedRef.current = false;
    }, 250);
  };

  // ================= THUMBNAIL AUTOPLAY (IntersectionObserver) =================
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // select only thumbnail videos inside container
    const vids = container.querySelectorAll("video.thumbnail");
    if (!vids || vids.length === 0) return;

    // observer: play when ~60% visible, pause otherwise.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          // if modal is open, keep thumbnails paused
          if (playVideo) {
            try {
              v.pause();
            } catch (e) {}
            return;
          }

          // If thumbnail is mostly visible => play (muted + loop)
          if (entry.intersectionRatio >= 0.6) {
            try {
              v.muted = true;
              v.loop = true;
              // try to play; browsers allow muted autoplay usually
              const p = v.play();
              if (p && p instanceof Promise) p.catch(() => {});
            } catch (e) {}
          } else {
            try {
              v.pause();
              // reset to small time to keep consistent preview (optional)
              // v.currentTime = 0;
            } catch (e) {}
          }
        });
      },
      {
        threshold: [0.0, 0.25, 0.5, 0.6, 0.75, 1],
      }
    );

    vids.forEach((v) => observer.observe(v));

    return () => {
      observer.disconnect();
    };
    // re-run when videos list or modal state changes
  }, [videos, playVideo]);

  // ================= AUTO-SCROLL (requestAnimationFrame) =================
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const step = () => {
      if (!isAutoScrollPausedRef.current && !isDraggingRef.current) {
        el.scrollLeft += AUTO_SCROLL_SPEED;
        const maxScroll = el.scrollWidth / 2;
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft = el.scrollLeft - maxScroll;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [videos]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    isAutoScrollPausedRef.current = true;
  };

  // ================= RENDER =================
  const looped = [...videos, ...videos];

  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-28 text-center relative overflow-hidden"
      style={{ backgroundColor: "#FFF9E8" }}
    >
      <div className="absolute top-10 right-10 w-56 sm:w-72 md:w-80 lg:w-96 h-56 sm:h-72 md:h-80 lg:h-96 bg-[#CBE600]/10 rounded-full blur-3xl" />

      {/* HEADING */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12 md:mb-16 relative z-10">
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

      {/* MARQUEE / SCROLLABLE (draggable + auto-scroll) */}
      <div className="w-full py-6 sm:py-8 md:py-10 relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-20 md:w-24 " />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-20 md:w-24 " />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          className={`flex overflow-x-auto gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-8 pb-4 select-none cursor-grab`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {looped.map((video, idx) => (
            <article
              key={idx}
              className="group relative w-48 sm:w-56 md:w-64 lg:w-72 shrink-0"
            >
              <div
                className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-[#DFF200] group-hover:border-[#CBE600] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                onClick={() => setPlayVideo(video.url)}
              >
                <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden">
                  {/* Thumbnail video: autoplay when visible (muted + loop) */}
                  <video
                    className="thumbnail w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={video.url}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                  />

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

        {/* hide scrollbar for webkit */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </div>

      {/* PLAY MODAL */}
      {playVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={handleClosePlayer}
        >
          <div
            className="relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row w-auto max-h-[90vh] overflow-y-auto animate-modal-pop mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
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

            <div className="flex flex-col w-full lg:w-[380px] bg-white">
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

                <button
                  onClick={handleClosePlayer}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-base sm:text-lg transition-all duration-200 cursor-pointer"
                  aria-label="Close video"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-4 border-b border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Discover our latest collection! Premium quality, trendy
                  designs at best prices 🛍️✨
                </p>
                <button className="text-sm text-gray-400 mt-2 hover:text-gray-600 transition-colors">
                  See more
                </button>
              </div>

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
                      <div className="w-16 h-20 rounded-lg shrink-0 overflow-hidden bg-gray-100">
                        <img
                          src={product.imageUrl?.[0] || product.image}
                          alt={product.title || product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

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

      {/* ANIMATIONS & KEYFRAMES */}
      <style>
        {`
          @keyframes modal-pop {
            0% { opacity: 0; transform: scale(0.9) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-modal-pop { animation: modal-pop 0.3s ease-out forwards; }
        `}
      </style>
    </section>
  );
};

export default HomeVideoSlider;
