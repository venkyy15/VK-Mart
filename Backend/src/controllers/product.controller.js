import Product from "../models/Product.js";
import { apiResponse } from "../utils/apiResponse.js";

/* ======================================================
   GET ALL PRODUCTS (WITH SEARCH)
====================================================== */
export const getAllProducts = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    let filter = {};

    if (keyword && keyword.trim()) {
      const searchRegex = new RegExp(keyword.trim(), "i");
      filter = {
        $or: [
          { name: searchRegex },
          { category: searchRegex },
          { description: searchRegex }
        ]
      };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    apiResponse(res, 200, true, "Products fetched", products);
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   GET PRODUCT BY ID
====================================================== */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    apiResponse(res, 200, true, "Product fetched", product);
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   CREATE PRODUCT (CATEGORY-AWARE)
====================================================== */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      category,
      brand,
      price,
      description,
      stock,

      // ✅ NEW (IMPORTANT)
      highlights,
      specifications
    } = req.body;

    if (!name || !slug || !category || !price) {
      res.status(400);
      throw new Error("Required fields missing");
    }

    if (!req.file) {
      res.status(400);
      throw new Error("Product image is required");
    }

    const exists = await Product.findOne({ slug });
    if (exists) {
      res.status(400);
      throw new Error("Product already exists");
    }

    const product = await Product.create({
      name,
      slug,
      category,
      brand,
      price,
      description,
      stock,
      image: req.file.path,

      // 🔥 SAVE PRODUCT-SPECIFIC DATA
      highlights: Array.isArray(highlights) ? highlights : [],
      specifications: specifications || {}
    });

    apiResponse(res, 201, true, "Product created", product);
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   UPDATE PRODUCT (CATEGORY-SAFE)
====================================================== */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const {
      highlights,
      specifications,
      ...rest
    } = req.body;

    // update normal fields
    Object.assign(product, rest);

    // update highlights safely
    if (Array.isArray(highlights)) {
      product.highlights = highlights;
    }

    // update specs safely
    if (specifications && typeof specifications === "object") {
      product.specifications = specifications;
    }

    await product.save();

    apiResponse(res, 200, true, "Product updated", product);
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   DELETE PRODUCT
====================================================== */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await product.deleteOne();

    apiResponse(res, 200, true, "Product deleted");
  } catch (error) {
    next(error);
  }
};
