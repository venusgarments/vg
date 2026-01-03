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
          {
            id: "tops",
            name: "Tops",
            path: "/women/topwear/tops",
            image:
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000",
          },
          {
            id: "jacket",
            name: "Jacket",
            path: "/women/topwear/jacket",
            image:
              "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=1000",
          },
          {
            id: "hoodies",
            name: "Hoodies",
            path: "/women/topwear/hoodies",
            image:
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
          },
          {
            id: "cardigans",
            name: "Cardigans",
            path: "/women/topwear/cardigans",
            image:
              "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000",
          },
          {
            id: "coats",
            name: "Coats",
            path: "/women/topwear/coats",
            image:
              "https://images.unsplash.com/photo-1539533018447-63fcce6a25e8?q=80&w=1000",
          },
          {
            id: "shrug",
            name: "Shrug",
            path: "/women/topwear/shrug",
            image:
              "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000",
          },
          {
            id: "sweat-shirts",
            name: "Sweat Shirts",
            path: "/women/topwear/sweat-shirts",
            image:
              "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000",
          },
        ],
      },

      {
        id: "kurti",
        title: "Kurti-Set",
        subHeadings: [
          {
            id: "party_wear",
            name: "Party Wear",
            path: "/women/kurti/party_wear",
            image:
              "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1000",
          },
          {
            id: "casual",
            name: "Casual",
            path: "/women/kurti/casual",
            image:
              "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000",
          },
        ],
      },

      {
        id: "cord_set",
        title: "Cord Set",
        subHeadings: [
          {
            id: "ethentic",
            name: "Ethnic",
            path: "/women/cord_set/ethentic",
            image:
              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000",
          },
          {
            id: "western",
            name: "Western",
            path: "/women/cord_set/western",
            image:
              "https://images.unsplash.com/photo-1551163943-3f6a29e3965e?q=80&w=1000",
          },
        ],
      },

      {
        id: "dresses",
        title: "Dresses",
        subHeadings: [
          {
            id: "woolen",
            name: "Woollen",
            path: "/women/dresses/woolen",
            image:
              "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=1000",
          },
          {
            id: "party_waer",
            name: "Party Wear",
            path: "/women/dresses/party_waer",
            image:
              "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1000",
          },
        ],
      },

      {
        id: "night_suits",
        title: "Night Suits",
        subHeadings: [
          {
            id: "sleep_wear",
            name: "Sleep Wear",
            path: "/women/night_suits/sleep_wear",
            image:
              "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=1000",
          },
        ],
      },

      {
        id: "bottom_wear",
        title: "Bottom Wear",
        subHeadings: [
          {
            id: "jeans",
            name: "Jeans",
            path: "/women/bottom_wear/jeans",
            image:
              "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000",
          },
          {
            id: "pants",
            name: "Pants",
            path: "/women/bottom_wear/pants",
            image:
              "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000",
          },
          {
            id: "jeggings",
            name: "Jeggings",
            path: "/women/bottom_wear/jeggings",
            image:
              "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000",
          },
          {
            id: "lower",
            name: "Lower",
            path: "/women/bottom_wear/lower",
            image:
              "https://images.unsplash.com/photo-1552902888-2e3775f0f353?q=80&w=1000",
          },
        ],
      },

      {
        id: "lingerie",
        title: "Lingerie",
        subHeadings: [
          {
            id: "Jockey",
            name: "Jockey",
            path: "/women/lingerie/Jockey",
            image:
              "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=1000",
          },
          {
            id: "Amante",
            name: "Amante",
            path: "/women/lingerie/Amante",
            image:
              "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000",
          },
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
          "https://images.unsplash.com/photo-1488161628813-99425260dead?q=80&w=1000",
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
          {
            id: "ziper",
            name: "Zipper",
            path: "/men/top_wear/ziper",
            image:
              "https://images.unsplash.com/photo-1593032465175-d5c22502c382?q=80&w=1000",
          },
          {
            id: "jackets",
            name: "Jackets",
            path: "/men/top_wear/jackets",
            image:
              "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
          },
          {
            id: "hoodie",
            name: "Hoodies",
            path: "/men/top_wear/hoodie",
            image:
              "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000",
          },
          {
            id: "sweaters",
            name: "Sweaters",
            path: "/men/top_wear/sweaters",
            image:
              "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1000",
          },
          {
            id: "shirts",
            name: "Shirts",
            path: "/men/top_wear/shirts",
            image:
              "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?q=80&w=1000",
          },
          {
            id: "coats",
            name: "Coats",
            path: "/men/top_wear/coats",
            image:
              "https://images.unsplash.com/photo-1544923246-77307dd65c97?q=80&w=1000",
          },
        ],
      },

      {
        id: "bottom_wear",
        title: "Bottom Wear",
        subHeadings: [
          // note: your categoryHierarchy originally had a typo "valuse" for jeans under men.bottom_wear;
          // but the top-level men.bottom_wear array in the hierarchy still implies "jeans","trousers","lower"
          {
            id: "jeans",
            name: "Jeans",
            path: "/men/bottom_wear/jeans",
            image:
              "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000",
          },
          {
            id: "trousers",
            name: "Trousers",
            path: "/men/bottom_wear/trousers",
            image:
              "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000",
          },
          {
            id: "lower",
            name: "Lower",
            path: "/men/bottom_wear/lower",
            image:
              "https://images.unsplash.com/photo-1552902888-2e3775f0f353?q=80&w=1000",
          },
        ],
      },

      {
        id: "inner_wear",
        title: "Inner Wear",
        subHeadings: [
          {
            id: "jockey",
            name: "Jockey",
            path: "/men/inner_wear/jockey",
            image:
              "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=1000",
          },
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
