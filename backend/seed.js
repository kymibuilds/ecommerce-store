import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

const MONGO_URI = `${process.env.MONGO_URI}/forever`;

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  subCategory: String,
  bestseller: Boolean,
  sizes: [String],
  image: [String],
  date: { type: Number, default: Date.now() },
});

const Product = mongoose.model("product", productSchema);

const products = [
  {
    name: "Men’s Classic T-Shirt",
    description: "Soft cotton fabric, slim fit casual wear.",
    price: 25,
    category: "Men",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["S", "M", "L"],
    image: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?w=500",
    ],
  },
  {
    name: "Women’s Summer Dress",
    description: "Lightweight floral print dress for everyday comfort.",
    price: 40,
    category: "Women",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["S", "M"],
    image: [
      "https://images.unsplash.com/photo-1520974735194-6cb69e6f0f76?w=500",
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=500",
    ],
  },
  {
    name: "Kids Hoodie",
    description: "Fleece-lined hoodie perfect for school and play.",
    price: 30,
    category: "Kids",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S", "M"],
    image: [
      "https://images.unsplash.com/photo-1602810318383-94cbb3b9f8b8?w=500",
    ],
  },
  {
    name: "Men’s Jeans",
    description: "Stretch denim for all-day comfort.",
    price: 55,
    category: "Men",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["M", "L"],
    image: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    ],
  },
  {
    name: "Women’s Pullover Sweater",
    description: "Cozy wool blend pullover with ribbed cuffs.",
    price: 60,
    category: "Women",
    subCategory: "Winterwear",
    bestseller: true,
    sizes: ["M", "L"],
    image: [
      "https://images.unsplash.com/photo-1618354691719-8b9402d5e60a?w=500",
    ],
  },
  {
    name: "Kids Joggers",
    description: "Soft cotton joggers for active comfort.",
    price: 28,
    category: "Kids",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S", "M", "L"],
    image: [
      "https://images.unsplash.com/photo-1618354585932-df776fd45c0e?w=500",
    ],
  },
  {
    name: "Men’s Puffer Jacket",
    description: "Lightweight insulated jacket for cold weather.",
    price: 90,
    category: "Men",
    subCategory: "Winterwear",
    bestseller: true,
    sizes: ["M", "L"],
    image: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500",
      "https://images.unsplash.com/photo-1576566588028-7b9180b1991c?w=500",
    ],
  },
  {
    name: "Women’s Denim Jacket",
    description: "Vintage blue denim jacket, timeless style.",
    price: 75,
    category: "Women",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S", "M", "L"],
    image: [
      "https://images.unsplash.com/photo-1530041539828-01e2a06f45d2?w=500",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500",
    ],
  },
  {
    name: "Men’s Shorts",
    description: "Breathable cotton shorts ideal for summer.",
    price: 35,
    category: "Men",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["M", "L"],
    image: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500",
    ],
  },
  {
    name: "Women’s Yoga Pants",
    description: "Stretchable and breathable leggings for workouts.",
    price: 45,
    category: "Women",
    subCategory: "Bottomwear",
    bestseller: true,
    sizes: ["S", "M", "L"],
    image: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    ],
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🧹 Cleared old products");

    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products successfully`);

    mongoose.connection.close();
    console.log("🔒 Connection closed");
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  }
};

seedData();
