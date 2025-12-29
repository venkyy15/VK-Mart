import express from "express";
import {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getSessions,
  updateLoginAlerts
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ======================================================
   AUTH – PUBLIC
====================================================== */
router.post("/signup", signup);
router.post("/login", login);

/* ======================================================
   PROFILE (EXISTING – DO NOT BREAK)
   GET /api/auth/profile
   PUT /api/auth/profile
====================================================== */
router
  .route("/profile")
  .get(protect, getProfile)
  .put(protect, updateProfile);

/* ======================================================
   🔐 LOGIN & SECURITY
====================================================== */

/* 🔐 Change Password
   PUT /api/auth/change-password */
router.put("/change-password", protect, changePassword);

/* 📱 Active Sessions
   GET /api/auth/sessions */
router.get("/sessions", protect, getSessions);

/* 🔔 Login Alerts (Enable / Disable)
   PUT /api/auth/login-alerts */
router.put("/login-alerts", protect, updateLoginAlerts);

export default router;
