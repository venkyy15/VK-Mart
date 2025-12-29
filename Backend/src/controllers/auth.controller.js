import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { apiResponse } from "../utils/apiResponse.js";

/* ======================================================
   SIGNUP
   POST /api/auth/signup
====================================================== */
export const signup = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    email = email.toLowerCase().trim();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    const user = await User.create({
      name: name.trim(),
      email,
      password
    });

    return apiResponse(res, 201, true, "Signup successful", {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   LOGIN
   POST /api/auth/login
====================================================== */
export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    email = email.toLowerCase().trim();

    // 🔐 select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    return apiResponse(res, 200, true, "Login successful", {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   GET PROFILE
   GET /api/auth/profile
====================================================== */
export const getProfile = async (req, res, next) => {
  try {
    return apiResponse(res, 200, true, "Profile fetched", {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
    });
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   UPDATE PROFILE
   PUT /api/auth/profile
====================================================== */
export const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.name = name.trim();
    await user.save();

    return apiResponse(res, 200, true, "Profile updated", {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   🔐 CHANGE PASSWORD
   PUT /api/auth/change-password
====================================================== */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters"
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    // ✅ JUST ASSIGN – pre("save") will hash
    user.password = newPassword;
    await user.save();

    return apiResponse(
      res,
      200,
      true,
      "Password updated successfully"
    );
  } catch (error) {
    console.error("❌ CHANGE PASSWORD ERROR:", error);
    res.status(500).json({
      message: "Password update failed"
    });
  }
};

/* ======================================================
   📱 ACTIVE SESSIONS (MOCK – FUTURE READY)
   GET /api/auth/sessions
====================================================== */
export const getSessions = async (req, res) => {
  try {
    return apiResponse(res, 200, true, "Active sessions", [
      {
        device: "Desktop - Chrome",
        ip: req.ip,
        lastActive: "Just now"
      }
    ]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sessions"
    });
  }
};

/* ======================================================
   🔔 LOGIN ALERT SETTINGS (FRONTEND READY)
   PUT /api/auth/login-alerts
====================================================== */
export const updateLoginAlerts = async (req, res) => {
  try {
    const { enabled } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      loginAlerts: Boolean(enabled)
    });

    return apiResponse(
      res,
      200,
      true,
      "Login alert settings updated"
    );
  } catch (error) {
    res.status(500).json({
      message: "Failed to update login alerts"
    });
  }
};
