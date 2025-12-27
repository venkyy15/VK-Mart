// src/models/Cart.js
import mongoose from "mongoose";

/* =========================
   CART ITEM SCHEMA
========================= */
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    }
  },
  {
    _id: true // ✅ REQUIRED for React key + update/remove safety
  }
);

/* =========================
   CART SCHEMA
========================= */
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // ✅ one cart per user
    },

    items: {
      type: [cartItemSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

/* =========================
   INDEXES (SAFE)
========================= */
// ⚠️ avoid duplicate index warning
cartSchema.index({ user: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
