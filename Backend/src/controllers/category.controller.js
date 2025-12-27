// src/controllers/category.controller.js

import Category from "../models/Category.js";
import { apiResponse } from "../utils/apiResponse.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    apiResponse(res, 200, true, "Categories fetched", categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (admin later)
export const createCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      res.status(400);
      throw new Error("Name and slug are required");
    }

    const exists = await Category.findOne({
      $or: [{ name }, { slug }]
    });

    if (exists) {
      res.status(400);
      throw new Error("Category already exists");
    }

    const category = await Category.create({
      name,
      slug
    });

    apiResponse(res, 201, true, "Category created", category);
  } catch (error) {
    next(error);
  }
};
