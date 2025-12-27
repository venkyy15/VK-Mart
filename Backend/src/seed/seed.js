// src/seed/seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";

import Category from "../models/Category.js";
import Product from "../models/Product.js";

import categories from "./categories.seed.js";
import products from "./products.seed.js";

dotenv.config();

const seedData = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectDB();

    console.log("🧹 Clearing old data...");
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log("📂 Inserting categories...");
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} categories inserted`);

    console.log("📦 Inserting products...");
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products inserted`);

    console.log("🎉 SEEDING COMPLETED SUCCESSFULLY");
    process.exit(0);
  } catch (error) {
    console.error("❌ SEED ERROR:", error);
    process.exit(1);
  }
};

seedData();
