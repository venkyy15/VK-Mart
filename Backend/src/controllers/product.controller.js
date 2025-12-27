import Product from "../models/Product.js";
import { apiResponse } from "../utils/apiResponse.js";

// @desc    Get all products (WITH SEARCH)
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i"
          }
        }
      : {};

    const products = await Product.find(keyword).sort({
      createdAt: -1
    });

    apiResponse(res, 200, true, "Products fetched", products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID
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

// @desc    Create product WITH IMAGE
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
      image: req.file.path // 🔥 CLOUDINARY URL
    });

    apiResponse(res, 201, true, "Product created", product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
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

// @desc    Delete product
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
