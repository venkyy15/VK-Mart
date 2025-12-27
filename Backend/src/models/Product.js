// src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true
    },

    category: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0          // ✅ SAFETY
    },

    description: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      required: true
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    isActive: {
      type: Boolean,
      default: true       // ✅ future soft delete
    }
  },
  {
    timestamps: true
  }
);

// ✅ Helpful indexes
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
