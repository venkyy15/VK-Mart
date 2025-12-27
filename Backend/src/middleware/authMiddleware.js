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
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      // optional cookie support (won’t break anything)
      token = req.cookies.token;
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token" });
    }

    /* =====================================
       2️⃣ VERIFY TOKEN
    ===================================== */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* =====================================
       3️⃣ ATTACH USER (PASSWORD EXCLUDED)
    ===================================== */
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    return res.status(401).json({
      message:
        error.name === "TokenExpiredError"
          ? "Token expired, please login again"
          : "Not authorized, token failed"
    });
  }
};
