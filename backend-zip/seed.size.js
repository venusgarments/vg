
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
  // { category: "jackets", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }] },
  // { category: "hoodies", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }] },
  { category: "sweaters", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }] },
  { category: "shirts", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }, { label: "XXL" }] },
  // { category: "coats", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }] },

  // men.bottom_wear
  // { category: "jeans", sizes: [{ label: "28" }, { label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }] },
  { category: "trousers", sizes: [{ label: "30" }, { label: "32" }, { label: "34" }, { label: "36" }] },
  // { category: "lower", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }] },

  // men.inner_wear
  { category: "jockey", sizes: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }] },

  // === KIDS (use keys exactly as in hierarchy) ===
  { category: "bottom_wear", sizes: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }] },
  // { category: "tops", sizes: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }] },
  { category: "kurtis", sizes: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }] },
  {
    category: "shawl",
    sizes: [{ label: "Free Size" }, { label: "1" }, { label: "2" }, { label: "3" }]
  },
  {
    category: "cap",
    sizes: [{ label: "Free Size" }, { label: "1" }, { label: "2" }]
  },
  {
    category: "socks",
    sizes: [{ label: "Free Size" }, { label: "1" }, { label: "2" }, { label: "3" }]
  },
  {
    category: "muffler",
    sizes: [{ label: "Free Size" }, { label: "1" }, { label: "2" }]
  },
  {
    category: "gloves",
    sizes: [{ label: "Free Size" }, { label: "1" }, { label: "2" }, { label: "3" }]
  },
  {
    category: "hand_towel",
    sizes: [{ label: "Free Size" }, { label: "1" }, { label: "2" }]
  },
  {
    category: "bath_towel",
    sizes: [{ label: "Free Size" }, { label: "1" }, { label: "2" }, { label: "3" }]
  },
  {
    category: "face_towel",
    sizes: [{ label: "Free Size" }, { label: "1" }, { label: "2" }]
  },
  {
    category: "handkerchief",
    sizes: [{ label: "Free Size" }]
  }

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
