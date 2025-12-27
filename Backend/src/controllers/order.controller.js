import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { apiResponse } from "../utils/apiResponse.js";

/* ======================================================
   PLACE ORDER
   POST /api/orders
   Private
====================================================== */
export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    /* ---------- BASIC VALIDATION ---------- */
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        message: "Shipping address and payment method are required"
      });
    }

    /* ---------- FETCH CART ---------- */
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    /* ---------- BUILD ORDER ITEMS ---------- */
    let totalAmount = 0;              // ✅ MUST MATCH MODEL
    const orderItems = [];

    for (const item of cart.items) {
      if (
        !item ||
        !item.product ||
        typeof item.product.price !== "number" ||
        item.qty < 1
      ) {
        return res.status(400).json({
          message: "Invalid product in cart. Please refresh cart."
        });
      }

      totalAmount += item.product.price * item.qty;

      orderItems.push({
        product: item.product._id,
        qty: item.qty,
        price: item.product.price
      });
    }

    if (orderItems.length === 0 || totalAmount <= 0) {
      return res.status(400).json({
        message: "Unable to calculate order total"
      });
    }

    /* ---------- CREATE ORDER (MODEL EXACT MATCH) ---------- */
    const order = await Order.create({
      user: req.user._id,
      orderItems,               // ✅ schema field
      shippingAddress,
      paymentMethod,
      totalAmount,               // ✅ schema field
      isPaid: paymentMethod === "COD"
    });

    /* ---------- REDUCE PRODUCT STOCK ---------- */
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock = Math.max(0, product.stock - item.qty);
        await product.save();
      }
    }

    /* ---------- CLEAR CART ---------- */
    cart.items = [];
    await cart.save();

    return apiResponse(
      res,
      201,
      true,
      "Order placed successfully",
      order
    );
  } catch (error) {
    console.error("❌ PLACE ORDER ERROR:", error);
    return res.status(500).json({
      message: "Failed to place order",
      error: error.message
    });
  }
};

/* ======================================================
   GET MY ORDERS
   GET /api/orders/my
====================================================== */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "orderItems.product",
        strictPopulate: false   // ✅ handles old data safely
      });

    return apiResponse(res, 200, true, "Orders fetched", orders);
  } catch (error) {
    console.error("❌ GET ORDERS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

/* ======================================================
   GET ORDER BY ID
   GET /api/orders/:id
====================================================== */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "orderItems.product",
        strictPopulate: false
      })
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    return apiResponse(res, 200, true, "Order fetched", order);
  } catch (error) {
    console.error("❌ GET ORDER ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch order",
      error: error.message
    });
  }
};
