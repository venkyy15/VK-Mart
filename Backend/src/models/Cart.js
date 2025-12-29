// src/models/Cart.js
import mongoose from "mongoose";

/*CART ITEM SCHEMA*/
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
    _id: true // needed for update/remove specific cart item
  }
);

/*CART SCHEMA*/
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one cart per user
    },

    items: {
      type: [cartItemSchema],
      default: [],
      validate: [
        (val) => Array.isArray(val),
        "Cart items must be an array"
      ]
    }
  },
  {
    timestamps: true
  }
);

/*INDEX (IMPORTANT)*/ // prevents duplicate carts for same user
cartSchema.index({ user: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);
