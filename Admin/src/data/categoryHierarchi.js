const categoryHierarchy = {
  women: {
    topwear: [
      { value: "tops", label: "Tops" },
      { value: "jacket", label: "Jacket" },
      { value: "hoodies", label: "Hoodies" },
      { value: "cardigans", label: "Cardigans" }, // fixed
      { value: "coats", label: "Coats" },
      { value: "shrug", label: "Shrug" },
      { value: "sweatshirts", label: "Sweat Shirts" }, // fixed
    ],

    kurti: [
      { value: "party_wear", label: "Party Wear" },
      { value: "casual", label: "Casual" },
    ],

    cord_set: [
      { value: "ethnic", label: "Ethnic" }, // fixed
      { value: "western", label: "Western" },
    ],

    dresses: [
      { value: "woolen", label: "Woolen" },
      { value: "party_wear", label: "Party Wear" }, // fixed
    ],

    night_suits: [
      { value: "sleep_wear", label: "Sleep Wear" },
    ],

    bottom_wear: [
      { value: "jeans", label: "Jeans" },
      { value: "pants", label: "Pants" },
      { value: "jeggings", label: "Jeggings" },
      { value: "lower", label: "Lower" },
    ],

    lingerie: [
      { value: "jockey", label: "Jockey" },
      { value: "amante", label: "Amante" },
    ],

    accessories: [
      { value: "shawl", label: "Shawl" },
      { value: "cap", label: "Cap" },
      { value: "socks", label: "Socks" },
    ],
  },

  men: {
    top_wear: [
      { value: "zipper", label: "Zipper" }, // fixed
      { value: "jackets", label: "Jackets" },
      { value: "hoodie", label: "Hoodie" },
      { value: "sweaters", label: "Sweaters" },
      { value: "shirts", label: "Shirts" },
      { value: "coats", label: "Coats" },
    ],

    bottom_wear: [
      { value: "jeans", label: "Jeans" }, // fixed
      { value: "trousers", label: "Trousers" },
      { value: "lower", label: "Lower" },
    ],

    inner_wear: [
      { value: "jockey", label: "Jockey" },
    ],

    accessories: [
      { value: "cap", label: "Cap" },
      { value: "muffler", label: "Muffler" },
      { value: "gloves", label: "Gloves" },
      { value: "socks", label: "Socks" },
      { value: "hand_towel", label: "Hand Towel" },
      { value: "bath_towel", label: "Bath Towel" },
      { value: "face_towel", label: "Face Towel" },
      { value: "handkerchief", label: "Handkerchief" },
    ],
    towel:[
     { value: "hand_towel", label: "Hand Towel" },
      { value: "bath_towel", label: "Bath Towel" },
      { value: "face_towel", label: "Face Towel" },
    ]
  },

  kids: {
    bottom_wear: [],
    tops: [],
    kurtis: [],
  },
};

export default categoryHierarchy;
