// src/routes/category.routes.js

import express from "express";
import {
  getAllCategories,
  createCategory
} from "../controllers/category.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all categories (public)
router.get("/", getAllCategories);

// Create new category (admin / protected)
router.post("/", protect, createCategory);

export default router;
