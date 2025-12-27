// src/config/env.js

import dotenv from "dotenv";

/**
 * Load environment variables from .env file
 * Call this once at app startup if needed
 */
const loadEnv = () => {
  dotenv.config();

  if (!process.env.MONGO_URI) {
    console.warn("⚠️  MONGO_URI is not set in .env");
  }
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️  JWT_SECRET is not set in .env");
  }
};

export default loadEnv;
