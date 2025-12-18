const navigation = [
  {
    id: "home",
    title: "Home",
    path: "/",
    type: "link",
    images: [
      "https://images.unsplash.com/photo-1520975912274-2f1b8b1b3f1d?q=80&w=1200",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200",
    ],
  },

  {
    id: "women",
    title: "Women",
    featured: [
      {
        name: "New Arrivals",
        href: "/",
        imageSrc:
          "https://rukminim2.flixcart.com/image/612/612/xif0q/top/c/v/t/s-d-16-angarkha-original-imahc7ha2tgxvaqw.jpeg?q=70",
        imageAlt:
          "Models sitting back to back, wearing Basic Tee in black and bone.",
      },
      {
        name: "Basic Tees",
        href: "/",
        imageSrc:
          "https://rukminim2.flixcart.com/image/612/612/ku4ezrk0/top/g/s/1/xl-printed-top-fancify-original-imag7bb3yg9xx4yn.jpeg?q=70",
        imageAlt:
          "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
      },
    ],

    /* categories for women — strictly reflect your categoryHierarchy keys/values */
    categories: [
      {
        id: "topwear",
        title: "Topwear",
        subHeadings: [
          { id: "tops", name: "Tops", path: "/women/topwear/tops" },
          { id: "jacket", name: "Jacket", path: "/women/topwear/jacket" },
          { id: "hoodies", name: "Hoodies", path: "/women/topwear/hoodies" },
          { id: "cardigans", name: "Cardigans", path: "/women/topwear/cardigans" },
          { id: "coats", name: "Coats", path: "/women/topwear/coats" },
          { id: "shrug", name: "Shrug", path: "/women/topwear/shrug" },
          { id: "sweat-shirts", name: "Sweat Shirts", path: "/women/topwear/sweat-shirts" },
        ],
      },

      {
        id: "kurti",
        title: "Kurti",
        subHeadings: [
          { id: "party_wear", name: "Party Wear", path: "/women/kurti/party_wear" },
          { id: "casual", name: "Casual", path: "/women/kurti/casual" },
        ],
      },

      {
        id: "cord_set",
        title: "Cord Set",
        subHeadings: [
          { id: "ethentic", name: "Ethntic", path: "/women/cord_set/ethentic" },
          { id: "western", name: "Western", path: "/women/cord_set/western" },
        ],
      },

      {
        id: "dresses",
        title: "Dresses",
        subHeadings: [
          { id: "woolen", name: "Woollen", path: "/women/dresses/woolen" },
          { id: "party_waer", name: "Party Wear", path: "/women/dresses/party_waer" },
        ],
      },

      {
        id: "night_suits",
        title: "Night Suits",
        subHeadings: [
          { id: "sleep_wear", name: "Sleep Wear", path: "/women/night_suits/sleep_wear" },
        ],
      },

      {
        id: "bottom_wear",
        title: "Bottom Wear",
        subHeadings: [
          { id: "jeans", name: "Jeans", path: "/women/bottom_wear/jeans" },
          { id: "pants", name: "Pants", path: "/women/bottom_wear/pants" },
          { id: "jeggings", name: "Jeggings", path: "/women/bottom_wear/jeggings" },
          { id: "lower", name: "Lower", path: "/women/bottom_wear/lower" },
        ],
      },

      {
        id: "lingerie",
        title: "Lingerie",
        subHeadings: [
          { id: "Jockey", name: "Jockey", path: "/women/lingerie/Jockey" },
          { id: "Amante", name: "Amante", path: "/women/lingerie/Amante" },
        ],
      },
    ],
  },

  {
    id: "men",
    title: "Men",
    featured: [
      {
        name: "New Arrivals",
        href: "/",
        imageSrc:
          "https://rukminim2.flixcart.com/image/612/612/xif0q/top/c/v/t/s-d-16-angarkha-original-imahc7ha2tgxvaqw.jpeg?q=70",
        imageAlt:
          "Models sitting back to back, wearing Basic Tee in black and bone.",
      },
      {
        name: "Basic Tees",
        href: "/",
        imageSrc:
          "https://rukminim2.flixcart.com/image/612/612/ku4ezrk0/top/g/s/1/xl-printed-top-fancify-original-imag7bb3yg9xx4yn.jpeg?q=70",
        imageAlt:
          "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
      },
    ],

    /* categories for men — strictly reflect your categoryHierarchy keys/values */
    categories: [
      {
        id: "top_wear",
        title: "Top Wear",
        subHeadings: [
          { id: "ziper", name: "Zipper", path: "/men/top_wear/ziper" },
          { id: "jackets", name: "Jackets", path: "/men/top_wear/jackets" },
          { id: "hoodie", name: "Hoodies", path: "/men/top_wear/hoodie" },
          { id: "sweaters", name: "Sweaters", path: "/men/top_wear/sweaters" },
          { id: "shirts", name: "Shirts", path: "/men/top_wear/shirts" },
          { id: "coats", name: "Coats", path: "/men/top_wear/coats" },
        ],
      },

      {
        id: "bottom_wear",
        title: "Bottom Wear",
        subHeadings: [
          // note: your categoryHierarchy originally had a typo "valuse" for jeans under men.bottom_wear;
          // but the top-level men.bottom_wear array in the hierarchy still implies "jeans","trousers","lower"
          { id: "jeans", name: "Jeans", path: "/men/bottom_wear/jeans" },
          { id: "trousers", name: "Trousers", path: "/men/bottom_wear/trousers" },
          { id: "lower", name: "Lower", path: "/men/bottom_wear/lower" },
        ],
      },

      {
        id: "inner_wear",
        title: "Inner Wear",
        subHeadings: [
          { id: "jockey", name: "Jockey", path: "/men/inner_wear/jockey" },
        ],
      },
    ],
  },

  {
    id: "accessories",
    title: "Accessories",
    type: "link",
    path: "/accessories",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200",
      "https://images.unsplash.com/photo-1543486958-d783bfbf1f2b?q=80&w=1200",
    ],
  },

  {
    id: "bestseller",
    title: "Best Seller",
    type: "link",
    path: "/bestseller",
    images: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200",
      "https://images.unsplash.com/photo-1520975912274-2f1b8b1b3f1d?q=80&w=1200",
    ],
  },

  {
    id: "blog",
    title: "Blog",
    type: "link",
    path: "/blog",
    images: [],
  },
];

export default navigation;
