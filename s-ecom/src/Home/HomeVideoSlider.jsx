import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_React_BASE_API_URL;

const HomeVideoSlider = () => {
  const [videos, setVideos] = useState([]);
  const [playVideo, setPlayVideo] = useState(null);
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

  useEffect(() => {
    fetchVideos();
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
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-4xl rounded-xl p-4 relative border-2 border-black">
            {/* Close button — now cleanly stops playback */}
            <button
              onClick={handleClosePlayer}
              className="absolute top-3 right-3 text-xl font-bold  cursor-pointer z-10 text-black"
              aria-label="Close video"
            >
              ✖
            </button>

            <video
              ref={playerRef}
              src={playVideo}
              controls
              autoPlay
              className="w-full h-[60vh] sm:h-[70vh] rounded border-2 border-black bg-black object-contain"
            />
          </div>
        </div>
      )}

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
