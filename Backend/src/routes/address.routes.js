// src/routes/address.routes.js

import express from "express";
import {
  addAddress,
  getAddresses,
  deleteAddress,
  updateAddress
} from "../controllers/address.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add new address
router.post("/", protect, addAddress);

// Get all addresses of logged-in user
router.get("/", protect, getAddresses);

// ✅ SUPPORT OLD FRONTEND CALL (/all)
router.get("/all", protect, getAddresses);

// Update address by id
router.put("/:id", protect, updateAddress);

// Delete address by id
router.delete("/:id", protect, deleteAddress);

export default router;
