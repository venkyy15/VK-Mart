import Product from "../models/Product.js";
import { apiResponse } from "../utils/apiResponse.js";

/* ======================================================
   GET ALL PRODUCTS (WITH SEARCH)
   GET /api/products?keyword=iphone
====================================================== */
export const getAllProducts = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    let filter = {};

    // ✅ SEARCH SUPPORT (name + category + description)
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

    const products = await Product.find(filter).sort({
      createdAt: -1
    });

    apiResponse(res, 200, true, "Products fetched", products);
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   GET PRODUCT BY ID
   GET /api/products/:id
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
   CREATE PRODUCT (WITH IMAGE)
====================================================== */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      category,
      price,
      description,
      stock
    } = req.body;

    // 🛑 Validation
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
      price,
      description,
      stock,
      image: req.file.path // Cloudinary URL
    });

    apiResponse(res, 201, true, "Product created", product);
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   UPDATE PRODUCT
====================================================== */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    Object.assign(product, req.body);
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
