// src/routes/order.routes.js

import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById
} from "../controllers/order.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* PLACE ORDER */
router.post("/", protect, placeOrder);

/* GET MY ORDERS */
router.get("/my", protect, getMyOrders);

/* GET ORDER BY ID */
router.get("/:id", protect, getOrderById);

export default router;
