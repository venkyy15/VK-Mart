import mongoose from "mongoose";

/* ============================
   REVIEW SUB-SCHEMA
============================ */
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

/* ============================
   PRODUCT SCHEMA
============================ */
const productSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
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
      required: true,
      index: true
    },

    brand: {
      type: String,
      default: "VK Mart"
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    image: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    /* ============================
       DESCRIPTION (LONG)
    ============================ */
    description: {
      type: String,
      default: ""
    },

    /* ============================
       HIGHLIGHTS (BULLET POINTS)
       eg: Camera, Processor, Battery
    ============================ */
    highlights: {
      type: [String],
      default: []
    },

    /* ============================
       SPECIFICATIONS (AMAZON STYLE)
    ============================ */
    specifications: {
      display: {
        type: String,
        default: ""
      },
      processor: {
        type: String,
        default: ""
      },
      camera: {
        type: String,
        default: ""
      },
      battery: {
        type: String,
        default: ""
      },
      charging: {
        type: String,
        default: ""
      },
      ram: {
        type: String,
        default: ""
      },
      storage: {
        type: String,
        default: ""
      },
      os: {
        type: String,
        default: ""
      }
    },

    /* ============================
       REVIEWS & RATINGS
    ============================ */
    reviews: {
      type: [reviewSchema],
      default: []
    },

    rating: {
      type: Number,
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

/* ============================
   INDEXES
============================ */
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
