// src/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    /* =====================================
       1️⃣ GET TOKEN (HEADER OR COOKIE)
    ===================================== */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      // Optional cookie support (does not break header auth)
      token = req.cookies.token;
    }

    /* =====================================
       2️⃣ NO TOKEN → BLOCK
    ===================================== */
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing"
      });
    }

    /* =====================================
       3️⃣ VERIFY TOKEN
    ===================================== */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }

    /* =====================================
       4️⃣ FETCH USER (NO PASSWORD)
    ===================================== */
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    /* =====================================
       5️⃣ ATTACH USER & CONTINUE
    ===================================== */
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ AUTH ERROR:", error.message);

    return res.status(401).json({
      message:
        error.name === "TokenExpiredError"
          ? "Token expired, please login again"
          : "Not authorized, token failed"
    });
  }
};
