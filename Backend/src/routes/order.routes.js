// src/routes/order.routes.js

import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById
} from "../controllers/order.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Place a new order
 * @access  Private
 */
router.post("/", protect, placeOrder);

/**
 * @route   GET /api/orders/my
 * @desc    Get logged-in user's orders
 * @access  Private
 */
router.get("/my", protect, getMyOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get("/:id", protect, getOrderById);

export default router;
