import express from "express";
import {
  signup,
  login,
  getProfile,
  updateProfile
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router
  .route("/profile")
  .get(protect, getProfile)
  .put(protect, updateProfile); // ✅ THIS FIXES 404

export default router;
