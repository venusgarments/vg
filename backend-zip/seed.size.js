// // scripts/seedSizeCharts.js
// const dotenv = require('dotenv');
// dotenv.config();
// const mongoose = require("mongoose");
// const SizeChart = require('./src/models/sizechart.model').default || require('./src/models/sizechart.model');

// const dummySizeCharts = [
//   // WOMEN - Top
//   {
//     category: "ladies_tops",
//     sizes: [
//       { label: "S" },
//       { label: "M" },
//       { label: "L" },
//       { label: "XL" },
//       { label: "XXL" },
//       { label: "3XL" },
//       { label: "Free" }
//     ]
//   },

//   // WOMEN - Jacket variants
//   {
//     category: "half_jacket",
//     sizes: [
//       { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }
//     ]
//   },
//   {
//     category: "crop_jacket",
//     sizes: [
//       { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }
//     ]
//   },
//   {
//     category: "denim-jacket",
//     sizes: [
//       { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }
//     ]
//   },

//   // WOMEN - Hoodie variants (added oversized and back-print specific ones)
//   {
//     category: "hoodie",
//     sizes: [
//       { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" },
//       { label: "3XL" }, { label: "4XL" }, { label: "5XL" }, { label: "6XL" }, { label: "7XL" },
//       { label: "Free" }
//     ]
//   },
//   {
//     category: "oversized_hoodie",
//     sizes: [
//       { label: "Free" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }
//     ]
//   },
//   {
//     category: "back_print_hoodie",
//     sizes: [
//       { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }
//     ]
//   },

//   // WOMEN - Cardigan variants
//   {
//     category: "short_cardigan",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "long_cardigan",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },
//   {
//     category: "cotrise_cardigan",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "coat_look_cardigan",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },

//   // WOMEN - Coats
//   {
//     category: "short_length_coat",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },
//   {
//     category: "medium_length_coats",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },
//   {
//     category: "full_length_coats",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },

//   // WOMEN - Cord set
//   {
//     category: "ethentic",
//     sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "western",
//     sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },

//   // WOMEN - Kurti
//   {
//     category: "party_wear",
//     sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },
//   {
//     category: "casual",
//     sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },

//   // WOMEN - Night suits
//   {
//     category: "sleep_wear",
//     sizes: [{ label: "Free" }]
//   },

//   // WOMEN - Dresses
//   {
//     category: "woolen",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },
//   {
//     category: "dresses_party_wear",
//     sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },

//   // WOMEN - Jeans / Jeggings
//   {
//     category: "narrow_fit",
//     sizes: [{ label: "28" }, { label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }]
//   },
//   {
//     category: "regular_fit",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }, { label: "Free" }]
//   },
//   {
//     category: "jeggings_narrow_fit",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },

//   // WOMEN - Pants & lower
//   {
//     category: "formal_pants",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }, { label: "Free" }]
//   },
//   {
//     category: "trouser",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }, { label: "Free" }]
//   },
//   {
//     category: "bell_bottom",
//     sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "cottonise",
//     sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "pants_fits",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "regular_fit_lower",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "slim_fit",
//     sizes: [{ label: "28" }, { label: "30" }, { label: "32" }, { label: "Free" }]
//   },

//   // WOMEN - Lingerie
//   {
//     category: "jockey",
//     sizes: [{ label: "Free" }]
//   },
//   {
//     category: "amante",
//     sizes: [{ label: "Free" }]
//   },

//   // MEN - Zipper
//   {
//     category: "half-zipper",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },
//   {
//     category: "full-zipper",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },

//   // MEN - Jacket
//   {
//     category: "half-jacket",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },
//   {
//     category: "cotnise-jacket",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },
//   {
//     category: "denim",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }, { label: "Free" }]
//   },

//   // MEN - Formal trousers / lower
//   {
//     category: "linen-trouser",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }, { label: "Free" }]
//   },
//   {
//     category: "cargo",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }, { label: "Free" }]
//   },

//   // MEN - Jeans
//   {
//     category: "cotrises-jeans",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }, { label: "Free" }]
//   },
//   {
//     category: "fleece",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "without-fleece",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },

//   // MEN - Lower
//   {
//     category: "cotrises",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }]
//   },
//   {
//     category: "fleece_lower",
//     sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   },
//   {
//     category: "straight-fit",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }]
//   },
//   {
//     category: "narrow-fit",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }]
//   },
//   {
//     category: "lower-style-pant",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }]
//   },
//   {
//     category: "denim",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }]
//   },

//   // MEN - Cargo (duplicate region aware)
//   {
//     category: "cargo_lower",
//     sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }]
//   },

//   // FALLBACK / Generic - keep before finishing
//   {
//     category: "generic",
//     sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }]
//   }
// ];

// (async function seed() {
//   try {
//     const uri = process.env.MONGO_URI;
//     if (!uri) throw new Error("MONGO_URI not set in environment");

//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("✅ MongoDB connected");

//     await SizeChart.deleteMany({});
//     const result = await SizeChart.insertMany(dummySizeCharts);
//     console.log(`🌱 Seeded size charts: ${result.length}`);

//     await mongoose.disconnect();
//     console.log("✅ MongoDB disconnected");
//     process.exit(0);
//   } catch (err) {
//     console.error("Seed error:", err);
//     try { await mongoose.disconnect(); } catch(e) {}
//     process.exit(1);
//   }
// })();

// scripts/seedSizeCharts.js
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const SizeChart = require('./src/models/sizechart.model').default || require('./src/models/sizechart.model');

const dummySizeCharts = [
  // === WOMEN (match categoryHierarchy keys exactly) ===
  // women.topwear
  { category: "tops", sizes: [{ label: "XS" }, { label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },
  { category: "jacket", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },
  { category: "hoodies", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },
  { category: "cardigams", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },
  { category: "coats", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },
  { category: "shrug", sizes: [{ label: "Free" }, { label: "S" }, { label: "M" }, { label: "L" }] },
  { category: "sweat-shirts", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },

  // women.kurti
  { category: "party_wear", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },
  { category: "casual", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },

  // women.cord_set
  { category: "ethentic", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },
  { category: "western", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },

  // women.dresses
  { category: "woolen", sizes: [{ label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },
  { category: "party_waer", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "Free" }] },

  // women.night_suits
  { category: "sleep_wear", sizes: [{ label: "Free" }] },

  // women.bottom_wear
  { category: "jeans", sizes: [{ label: "26" }, { label: "28" }, { label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }] },
  { category: "pants", sizes: [{ label: "28" }, { label: "30" }, { label: "32" }, { label: "34" }, { label: "Free" }] },
  { category: "jeggings", sizes: [{ label: "XS" }, { label: "S" }, { label: "M" }, { label: "L" }, { label: "Free" }] },
  { category: "lower", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "Free" }] },

  // women.lingerie
  // Note: categoryHierarchy lists "Jockey" and "Amante" (capitalization preserved)
  { category: "Jockey", sizes: [{ label: "Free" }] },
  { category: "amante", sizes: [{ label: "Free" }] },

  // === MEN (match keys exactly) ===
  // men.top_wear
  { category: "ziper", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }] },
  { category: "jackets", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }] },
  { category: "hoodies", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }] },
  { category: "sweaters", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }] },
  { category: "shirts", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }] },
  { category: "coats", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }] },

  // men.bottom_wear
  { category: "jeans", sizes: [{ label: "28" }, { label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }] },
  { category: "trousers", sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }] },
  { category: "lower", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }] },

  // men.inner_wear
  { category: "jockey", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }] },

  // === KIDS (use keys exactly as in hierarchy) ===
  { category: "bottom_wear", sizes: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }] },
  { category: "tops", sizes: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }] },
  { category: "kurtis", sizes: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }] }
];

(async function seed() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not set in environment");

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected");

    // Replace existing size charts for these categories only:
    // Delete entries whose category matches any in dummySizeCharts, keep other DB entries intact.
    const categories = dummySizeCharts.map(s => s.category);
    await SizeChart.deleteMany({ category: { $in: categories } });

    const result = await SizeChart.insertMany(dummySizeCharts);
    console.log(`🌱 Seeded size charts: ${result.length}`);

    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    try { await mongoose.disconnect(); } catch(e) {}
    process.exit(1);
  }
})();
