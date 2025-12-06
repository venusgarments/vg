import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import HomeCarouselData from "./HomeCarouselData";
import axios from "axios";
import BlogModal from "../Components/BlogModal";

const API_BASE_URL = import.meta.env.VITE_React_BASE_API_URL;

// Data arrays
const newArrivals = [
  {
    id: 1,
    title: "Dark Cotton Kurtis",
    image:
      "https://rukminim2.flixcart.com/image/612/612/kq5iykw0/top/s/o/3/xl-plt205top-pretty-loving-thing-original-imag482b623yvzw2.jpeg?q=70",
  },
  {
    id: 2,
    title: "Sweat-Tshirts",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/top/i/t/z/s-1-zm70-samragyi-original-imahf42hxmv9thm8.jpeg?q=70",
  },
  {
    id: 3,
    title: "Daily Use Kurtis",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/p/m/c/14-15-years-hoodie-shirt-navy-blue-pampa-fashion-original-imahy7smwanapmwm.jpeg?q=70",
  },
  {
    id: 4,
    title: "Blazer Coat",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/7/7/6/s-st2-vebnor-original-imahekf5guf9jzar.jpeg?q=70",
  },
  {
    id: 5,
    title: "Gowns",
    image:
      "https://rukminim2.flixcart.com/image/612/612/kfwvcsw0/legging/3/f/2/free-bws023-k-m-r-garments-original-imafw9zmbgye5f9y.jpeg?q=70",
  },
  {
    id: 6,
    title: "Street Looks",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/r/u/b/m-ssf-507-bk-pr-bobn-neemiya-original-imah5y25ggap3wvh.jpeg?q=70",
  },
];

const winterImages = [
  "https://rukminim2.flixcart.com/image/612/612/xif0q/cap/r/a/9/free-winter-cap-woolen-beanie-neck-warmer-muffler-for-men-women-original-imahhggyacxgvqqa.jpeg?q=70",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80",
  "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/r/h/m/xl-zipper-hoodie-divra-clothing-original-imahgfgkrhhrhwas.jpeg?q=70",
  "https://images.unsplash.com/photo-1618354691458-471b88fcf0c6?auto=format&fit=crop&w=500&q=80",
  "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/c/c/u/xl-mt478-metronaut-original-imah4nh9hgqtb6wt.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/612/612/xif0q/sweatshirt/9/v/g/xxl-rs29h-front-hard-airforce-sl-woostro-original-imagwfrffah2qhyb.jpeg?q=70",
];

const spottedItems = [
  {
    id: 1,
    title: "Womens Leather Jacket",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Half Kurta Shirt For Men",
    image:
      "https://images.unsplash.com/photo-1531123414780-f0b5898f0fff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Sweater For Women",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Premium Blazer",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Casual Knit",
    image:
      "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Denim Jacket",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Grey Blazer",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Everyday Shirt",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === HomeCarouselData.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/blogs/all?limit=5`
        );
        setBlogs(response.data.items || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setBlogsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Format date helper
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

  const current = HomeCarouselData[currentIndex];

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] max-[2499px]:2xl:h-[850px] min-[2500px]:h-[1000px] overflow-hidden">
        {HomeCarouselData.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentIndex
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 pointer-events-none z-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ))}

        <div
          className="absolute inset-0 flex flex-col justify-end items-center text-center px-4 z-20 pb-32"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
            <p className="text-xs sm:text-sm md:text-base tracking-[0.25em] font-light text-white/90 uppercase">
              Timeless Fashion
            </p>

            <h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light leading-tight px-2"
              style={{ color: "#CBE600" }}
            >
              {current.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-light px-4">
              Discover elegance in every stitch
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 px-2">
              {current.buttons.map((btn, i) => (
                <button
                  key={i}
                  className="group relative px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase overflow-hidden rounded-md transition-all duration-300 hover:shadow-2xl hover:shadow-[#CBE600]/20"
                  style={{
                    backgroundColor: "#DFF200",
                    color: "#111111",
                  }}
                >
                  <span className="relative z-10 group-hover:text-black transition-colors">
                    {btn.text}
                  </span>
                  <div className="absolute inset-0 bg-[#CBE600] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? HomeCarouselData.length - 1 : prev - 1
            )
          }
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#DFF200] hover:text-black transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === HomeCarouselData.length - 1 ? 0 : prev + 1
            )
          }
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#DFF200] hover:text-black transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Progress indicators */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 z-30">
          {HomeCarouselData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="group relative"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`w-6 sm:w-8 md:w-10 lg:w-12 h-0.5 sm:h-1 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "bg-[#DFF200]"
                    : "bg-white/30 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* NEW ARRIVALS SECTION */}
      <section className="py-10 sm:py-14 md:py-20 lg:py-28 bg-[#FFFDF6] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 sm:w-40 md:w-52 lg:w-64 h-32 sm:h-40 md:h-52 lg:h-64 bg-[#CBE600]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-56 sm:w-72 md:w-80 lg:w-96 h-56 sm:h-72 md:h-80 lg:h-96 bg-[#DFF200]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
            data-aos="fade-up"
          >
            <span
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs tracking-widest font-medium mb-3 sm:mb-4"
              style={{ backgroundColor: "#DFF200", color: "#222426" }}
            >
              FRESH COLLECTION
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider font-serif font-light text-[#CBE600] mb-4 sm:mb-6 px-4">
              NEW ARRIVAL
            </h2>

            <div
              className="mx-auto mt-4 sm:mt-6 w-full max-w-[200px] sm:max-w-xs md:max-w-md h-8 sm:h-10 md:h-12"
              aria-hidden="true"
            >
              <svg viewBox="0 0 400 24" fill="none" className="w-full h-full">
                <path
                  d="M5 12H395M5 12C5 12 30 12 60 12C90 12 120 12 140 12C160 12 180 4 200 4C220 4 240 12 260 12C280 12 310 12 340 12C370 12 395 12 395 12"
                  stroke="#CBE600"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="5" cy="12" r="3" fill="#CBE600" />
                <circle cx="395" cy="12" r="3" fill="#CBE600" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
            {newArrivals.map((item, index) => (
              <article
                key={item.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#DFF200] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-72 xl:h-80 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <button
                      aria-label={`Explore ${item.title}`}
                      className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3 md:bottom-4 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase rounded-full bg-[#DFF200] text-[#222426] transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#CBE600] hover:shadow-xl whitespace-nowrap"
                    >
                      Explore Now
                    </button>
                  </div>

                  <div className="py-2 sm:py-3 md:py-4 lg:py-5 px-2 sm:px-3 text-center bg-linear-to-b from-white to-gray-50">
                    <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-[#222426] uppercase tracking-wide group-hover:text-[#CBE600] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex justify-center">
            <button className="group inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 border-[#444648] text-xs sm:text-sm md:text-base font-semibold text-[#444648] uppercase tracking-wide transition-all duration-300 hover:border-[#CBE600] hover:bg-[#CBE600] hover:text-white rounded-full">
              <span>Shop New Arrivals</span>
              <HiOutlineArrowNarrowRight className="text-base sm:text-lg md:text-xl transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </section>

      {/* WINTER COLLECTION SECTION */}
      <section
        className="py-12 sm:py-16 md:py-20 lg:py-28 text-center relative overflow-hidden"
        style={{ backgroundColor: "#FFF9E8" }}
      >
        <div className="absolute top-10 right-10 w-56 sm:w-72 md:w-80 lg:w-96 h-56 sm:h-72 md:h-80 lg:h-96 bg-[#CBE600]/10 rounded-full blur-3xl" />

        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12 md:mb-16 relative z-10"
          data-aos="fade-up"
        >
          <span
            className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs tracking-widest font-medium mb-3 sm:mb-4 md:mb-5"
            style={{ backgroundColor: "#CBE600", color: "white" }}
          >
            SEASONAL FAVORITES
          </span>

          <p
            className="text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.25em] font-medium mb-3 sm:mb-4 px-2"
            style={{ color: "#8A6F4F" }}
          >
            WHERE CLASSIC CULTURE MEETS MODERN WINTER FASHION
          </p>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-4 sm:mb-5 md:mb-6 px-4"
            style={{ color: "#CBE600", letterSpacing: "0.06em" }}
          >
            WINTER COLLECTION
          </h2>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light px-4"
            style={{ color: "#6B5B4A" }}
          >
            Celebrate winter in style with cozy textures, modern silhouettes,
            warm layers, and timeless fashion made for everyday elegance.
          </p>

          <div className="mt-4 sm:mt-5 md:mt-6">
            <button
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full text-sm sm:text-base font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 uppercase tracking-wide"
              style={{ backgroundColor: "#CBE600" }}
            >
              Shop Now
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
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
            </button>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="w-full py-6 sm:py-8 md:py-10 relative">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-20 md:w-24 bg-linear-to-r from-[#FFF9E8] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-20 md:w-24 bg-linear-to-l from-[#FFF9E8] to-transparent z-10" />

          <div className="flex w-max animate-marquee gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 items-stretch">
            {[...winterImages, ...winterImages].map((img, idx) => (
              <article
                key={idx}
                className="group relative w-48 sm:w-56 md:w-64 lg:w-72 shrink-0"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-[#DFF200] group-hover:border-[#CBE600] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden">
                    <img
                      src={img}
                      alt={`Winter item ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <button className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-bold uppercase rounded-full bg-[#DFF200] text-[#222426] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      Explore
                    </button>
                  </div>

                  <div className="py-3 sm:py-4 text-center bg-linear-to-b from-white to-gray-50">
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#222426] uppercase tracking-wider">
                      Winter Essential {(idx % winterImages.length) + 1}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

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

      {/* SPOTTED SECTION */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#FFFDF6] relative overflow-hidden">
        <div className="absolute top-20 left-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#DFF200]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className="text-center mb-10 sm:mb-12 md:mb-16"
            data-aos="fade-up"
          >
            <span
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs tracking-widest font-medium mb-3 sm:mb-4"
              style={{ backgroundColor: "#8A6F4F", color: "white" }}
            >
              TRENDING NOW
            </span>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider font-serif font-light mb-3 sm:mb-4 px-4"
              style={{ color: "#8A6F4F" }}
            >
              SPOTTED IN VENUS GARMENTS
            </h2>

            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-light px-4">
              Discover what fashion enthusiasts are loving this season
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:gap-8">
            {spottedItems.map((it, index) => (
              <article
                key={it.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#DFF200] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative w-full aspect-4/5 overflow-hidden">
                    <img
                      src={it.image}
                      alt={it.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <button
                      aria-label={`Explore ${it.title}`}
                      className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3 md:bottom-4 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase rounded-full bg-[#DFF200] text-[#222426] transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#CBE600] hover:shadow-xl whitespace-nowrap"
                    >
                      Explore Now
                    </button>
                  </div>

                  {/* TITLE */}
                  <div className="py-3 md:py-4 px-2 md:px-4 text-center bg-linear-to-b from-white to-gray-50">
                    <h3 className="text-sm md:text-base font-semibold text-[#222426] uppercase tracking-wide group-hover:text-[#CBE600] transition-colors duration-300">
                      {it.title}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden"
        style={{ backgroundColor: "#F8F6F0" }}
      >
        {/* background blobs */}
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-[#CBE600]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-[#DFF200]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            data-aos="fade-up"
          >
            <span
              className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs tracking-widest font-medium mb-3 sm:mb-4"
              style={{ backgroundColor: "#CBE600", color: "white" }}
            >
              FASHION INSIGHTS
            </span>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider font-serif font-light mb-3 sm:mb-4"
              style={{ color: "#8A6F4F" }}
            >
              FROM OUR BLOG
            </h2>

            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-light px-2">
              Stay inspired with the latest trends, styling tips, and fashion
              stories
            </p>
          </div>

          {/* GRID */}
          {blogsLoading ? (
            /* Loading Skeleton */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="h-40 sm:h-48 md:h-60 bg-gray-200" />
                  <div className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-full" />
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#CBE600]/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-[#CBE600]"
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
              <h3 className="text-xl font-semibold text-[#222426] mb-2">
                No blogs yet
              </h3>
              <p className="text-gray-500">
                Check back soon for exciting articles!
              </p>
            </div>
          ) : (
            /* Blog Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 auto-rows-fr">
              {blogs.map((blog, index) => (
                <article
                  key={blog._id}
                  className={`group flex ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div
                    onClick={() => openBlogModal(blog)}
                    className="block w-full h-full cursor-pointer"
                  >
                    <div
                      className={`bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#DFF200] transition-all duration-500 hover:shadow-2xl h-full flex flex-col ${
                        index === 0 ? "shadow-xl" : ""
                      }`}
                    >
                      {/* Image */}
                      <div
                        className={`relative w-full overflow-hidden shrink-0 ${
                          index === 0
                            ? "h-48 sm:h-64 md:h-[380px] lg:h-[480px] xl:h-[520px] grow"
                            : "h-40 sm:h-48 md:h-60"
                        }`}
                      >
                        {blog.images && blog.images.length > 0 ? (
                          <img
                            src={blog.images[0]}
                            alt={blog.title}
                            className={`w-full h-full object-cover transition-transform duration-700 ${
                              index === 0
                                ? "group-hover:scale-105"
                                : "group-hover:scale-110"
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-[#CBE600]/30 to-[#DFF200]/30 flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-[#CBE600]/50"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                              />
                            </svg>
                          </div>
                        )}
                        <div
                          className={`absolute inset-0 bg-linear-to-t ${
                            index === 0
                              ? "from-black/70 via-black/30"
                              : "from-black/50 via-transparent"
                          } to-transparent`}
                        />

                        {/* Featured Badge for first blog */}
                        {index === 0 && (
                          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#DFF200] text-[#222426]">
                              FEATURED
                            </span>
                          </div>
                        )}

                        {/* Content overlay for featured post */}
                        {index === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
                            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-white/80 text-xs sm:text-sm">
                              <time>{formatDate(blog.createdAt)}</time>
                              <span>•</span>
                              <span>{blog.author}</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-white mb-2 sm:mb-3 group-hover:text-[#DFF200] transition-colors duration-300 line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
                              {blog.summary}
                            </p>
                            <div className="inline-flex items-center gap-2 text-[#DFF200] font-semibold group-hover:gap-3 transition-all duration-300">
                              Read More
                              <svg
                                className="w-5 h-5"
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
                        )}
                      </div>

                      {/* Card Content for non-featured posts */}
                      {index !== 0 && (
                        <div className="p-6 md:p-7 flex flex-col grow">
                          <div className="flex items-center gap-3 mb-3 text-gray-500 text-xs">
                            <time>{formatDate(blog.createdAt)}</time>
                            <span>•</span>
                            <span className="text-[#CBE600] font-medium">
                              {blog.author}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-[#222426] mb-2 group-hover:text-[#CBE600] transition-colors duration-300 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 grow">
                            {blog.summary}
                          </p>
                          <div className="inline-flex items-center gap-2 text-[#8A6F4F] font-medium text-sm group-hover:gap-3 transition-all duration-300 mt-auto">
                            Read Article
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* View All button */}
          <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 border-2 border-[#8A6F4F] text-sm sm:text-base font-semibold text-[#8A6F4F] uppercase tracking-wide transition-all duration-300 hover:border-[#CBE600] hover:bg-[#CBE600] hover:text-white rounded-full shadow-lg hover:shadow-xl"
            >
              <span>View All Articles</span>
              <HiOutlineArrowNarrowRight className="text-lg sm:text-xl transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      <BlogModal
        blog={selectedBlog}
        onClose={closeBlogModal}
        formatDate={formatDate}
      />
    </>
  );
};

export default Home;
