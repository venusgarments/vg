const navigation = [
  {
    id: "home",
    title: "Home",
    path: "/",
    type: "link",
  },

  {
    id: "women",
    title: "Women",
    featured: [
      {
        name: "New Arrivals",
        href: "/",
      },
      {
        name: "Basic Tees",
        href: "/",
      },
    ],

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
      },
      {
        name: "Basic Tees",
        href: "/",
      },
    ],

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
];

export default navigation;
