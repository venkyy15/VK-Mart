import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ======================================================
   CART ROUTES (PROTECTED)
====================================================== */

// GET /api/cart
router.get("/", protect, getCart);

// POST /api/cart
router.post("/", protect, addToCart);

// PUT /api/cart
router.put("/", protect, updateCartItem);

// DELETE /api/cart/:productId
router.delete("/:productId", protect, removeCartItem);

export default router;
