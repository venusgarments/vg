const categoryHierarchy = {
  women: {
    topwear: [
      { value: "tops", label: "Tops" },
      { value: "jacket", label: "Jacket" },
      { value: "hoodies", label: "Hoodies" },
      { value: "cardigams", label: "Cardigams" },
      { value: "coats", label: "Coats" },
      { value: "shrug", label: "Shrug" },
      { value: "sweat-shirts", label: "Sweat Shirts" },
    ],
        kurti: [
      { value: "party_wear", label: "Party Wear" },
      { value: "casual", label: "Casual" },
    ],
        cord_set: [
      { value: "ethentic", label: "Ethentic" },
      { value: "western", label: "Western" },
    ],
        dresses: [
      { value: "woolen", label: "Woolen" },
      { value: "party_waer", label: "Party Wear" },
    ],
        night_suits: [
      { value: "sleep_wear", label: "Sleep Wear" },
    ],
    bottom_wear:[
      {value:"jeans", label:"Jeans"},
      {value:"pants", label:"Pants"},
      {value:"jeggings", label:"Jeggings"},
      {value:"lower", label:"Lower"},
    ],
    lingerie: [
      { value: "Jockey", label: "Jockey" },
      { value: "amante", label: "Amante" },
    ],
  },

  men: {
    top_wear: [
      // note: value uses ids exactly as in your navigation
      { value: "ziper", label: "Zipper" },
      { value: "jackets", label: "Jackets" },
      {value:"hoodies", label:"Hoodies"},
      {value:"sweaters", label:"Sweaters"},
      {value:"shirts", label:"Shirts"},
      {value:"coats", label:"Coats"}
    ],
    bottom_wear:[
      {valuse:"jeans", label:"Jeans"},
      {value:"trousers", label:"Trousers"},
      {value:"lower", label:"Lower"}
    ],
    inner_wear:[
      {value:"jockey", label:"Jockey"}
    ]
  },

  kids: {
    bottom_wear: [],
    tops: [],
    kurtis: [],
  },
};

export default categoryHierarchy;
