import React from "react";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      title: "Muffler",
      description: "Stay warm and stylish with our exclusive winter range",
      image:
        "https://res.cloudinary.com/dsr0bbmfk/image/upload/v1765891472/0c6745ac-0751-49ec-8c5c-a0f932007838_cxw3id.jpg",
      category: "men",
      path: "/men/accessories/muffler", // ADDED
    },
    {
      id: 2,
      title: "Caps",
      description: "Light, breezy, and perfect for winter days",
      image:
        "https://res.cloudinary.com/dsr0bbmfk/image/upload/v1765891568/bf0eeb8c-5a91-459d-9625-a339b7077891_jk5ny1.jpg",
      category: "men",
      path: "/men/accessories/cap", // ADDED
    },
    {
      id: 3,
      title: "Socks",
      description: "Traditional styles meet modern elegance",
      image:
        "https://res.cloudinary.com/dsr0bbmfk/image/upload/v1766027749/cb826da9-72e9-49dd-84fe-4b33918fe5da_qhe8ug.jpg",
      category: "women",
      path: "/men/accessories/socks", // ADDED
    },
    {
      id: 4,
      title: "GLoves",
      description: "Shine bright at every where",
      image:
        "https://res.cloudinary.com/dsr0bbmfk/image/upload/v1766027793/85d25426-4cc5-4db2-8802-038ba36a748f_pwjdzy.jpg",
      category: "women",
      path: "/men/accessories/gloves", // ADDED
    },
    {
      id: 5,
      title: "Handkerchief",
      description: "Everyday wear that feels like a dream",
      image:
        "https://res.cloudinary.com/dsr0bbmfk/image/upload/v1766027776/c678503c-5753-4881-a834-8ee789298a7c_qwqflo.jpg",
      category: "women",
      path: "/women/accessories/handkerchief", // ADDED
    },
    {
      id: 6,
      title: "Towel",
      description: "Soft, Febric ",
      image:
        "https://res.cloudinary.com/dsr0bbmfk/image/upload/v1766028425/OIP_wydk5k.jpg",
      category: "men",
      path: "/men/towel", // ADDED
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "#FFF9E8" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our curated collections designed to elevate your style. From
            seasonal favorites to timeless classics.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#CBE600]/20"
              onClick={() => navigate(collection.path)} // UPDATED
              data-aos="fade-up"
              data-aos-delay={collection.id * 100}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#111111] mb-2 group-hover:text-[#CBE600] transition-colors">
                  {collection.title}
                </h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevents double click navigation
                    navigate(collection.path);
                  }}
                  className="px-6 py-2 bg-[#DFF200] text-[#111111] font-semibold rounded-md hover:bg-[#CBE600] transition-colors duration-300"
                >
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="mt-16 bg-[#DFF200] rounded-lg p-8 md:p-12 text-center"
          data-aos="zoom-in"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Browse our full catalog or contact us for personalized
            recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-[#CBE600] text-[#111111] font-bold rounded-md hover:bg-[#111111] hover:text-[#DFF200] transition-colors duration-300"
            >
              Browse All Products
            </button>
            <button
              onClick={() => navigate("/contact-us")}
              className="px-8 py-3 bg-white text-[#111111] font-bold rounded-md border-2 border-[#CBE600] hover:bg-[#CBE600] transition-colors duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
