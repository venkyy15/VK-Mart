// src/routes/product.routes.js
import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

/* ================= PRODUCTS ================= */

// Get all products (PUBLIC)
router.get("/", getAllProducts);

// Get single product by ID (PUBLIC)
router.get("/:id", getProductById);

// Create product (ADMIN / AUTH)
router.post(
  "/",
  protect,
  upload.single("image"), // image field name
  createProduct
);

// Update product
router.put("/:id", protect, updateProduct);

// Delete product
router.delete("/:id", protect, deleteProduct);

export default router;
