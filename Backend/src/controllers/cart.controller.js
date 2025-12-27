import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { apiResponse } from "../utils/apiResponse.js";

/* ======================================================
   ADD TO CART
   POST /api/cart
====================================================== */
export const addToCart = async (req, res, next) => {
  try {
    const { productId, qty } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    }

    const quantity = qty ? Number(qty) : 1;

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, qty: quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].qty += quantity;
      } else {
        cart.items.push({
          product: productId,
          qty: quantity
        });
      }

      await cart.save();
    }

    const populatedCart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    return apiResponse(
      res,
      200,
      true,
      "Product added to cart",
      populatedCart
    );
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   GET CART
   GET /api/cart
====================================================== */
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    return apiResponse(
      res,
      200,
      true,
      "Cart fetched",
      cart || { items: [] }
    );
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   UPDATE CART ITEM
   PUT /api/cart
====================================================== */
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, qty } = req.body;

    if (!productId || qty === undefined) {
      return res.status(400).json({
        message: "Product ID and quantity required"
      });
    }

    const quantity = Number(qty);

    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found in cart"
      });
    }

    item.qty = quantity;
    await cart.save();

    const populatedCart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    return apiResponse(
      res,
      200,
      true,
      "Cart updated",
      populatedCart
    );
  } catch (error) {
    next(error);
  }
};

/* ======================================================
   REMOVE CART ITEM
   DELETE /api/cart/:productId
====================================================== */
export const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const populatedCart = await Cart.findOne({
      user: req.user._id
    }).populate("items.product");

    return apiResponse(
      res,
      200,
      true,
      "Item removed from cart",
      populatedCart
    );
  } catch (error) {
    next(error);
  }
};
