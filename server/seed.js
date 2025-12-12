// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const MONGODB_URI = process.env.MONGODB_URI;

const items = [
  // Appetizers (images correspond to files you already have in public/images)
  { name: "Hummus", price: 4.39, description: "Creamy chickpea dip", category: "Appetizer", image: "/images/image1.jpg" },
  { name: "Baba Ganoush", price: 5.59, description: "Smoky mashed eggplant", category: "Appetizer", image: "/images/image2.jpg" },
  { name: "Green Salad", price: 6.99, description: "Fresh greens with house dressing", category: "Appetizer", image: "/images/image3.jpg" },
  { name: "Fries", price: 4.99, description: "Crispy fries", category: "Appetizer", image: "/images/image4.jpg" },
  { name: "Tahini", price: 2.99, description: "Sesame tahini sauce", category: "Appetizer", image: "/images/image5.jpg" },

  // Entrees
  { name: "Grilled Chicken", price: 18.00, description: "Marinated grilled chicken", category: "Entree", image: "/images/image6.jpg" },
  { name: "Beef Shawarma", price: 10.99, description: "Thinly sliced beef with spices", category: "Entree", image: "/images/image7.jpg" },
  { name: "Chicken Shawarma", price: 9.99, description: "Juicy chicken shawarma", category: "Entree", image: "/images/image8.jpg" },
  { name: "6-PC Kofta", price: 9.49, description: "Six pieces of spiced kofta", category: "Entree", image: "/images/image9.jpg" },
  { name: "Koshari Platter", price: 9.49, description: "Egyptian rice & lentils platter", category: "Entree", image: "/images/image10.jpg" },
  { name: "5-PC Falafel", price: 5.49, description: "Five crunchy falafel", category: "Entree", image: "/images/image11.jpg" }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB for seeding.");
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(items);
    console.log("Seeded menu items:", items.length);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
