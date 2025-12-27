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

    // ✅ Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    email = email.toLowerCase().trim();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
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

    // ✅ Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    email = email.toLowerCase().trim();

    // 🔥 IMPORTANT FIX → SELECT PASSWORD
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
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
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

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
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Name is required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
