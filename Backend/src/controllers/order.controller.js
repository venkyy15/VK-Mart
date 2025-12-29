import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { apiResponse } from "../utils/apiResponse.js";

/* ======================================================
   PLACE ORDER
====================================================== */
export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        message: "Shipping address and payment method are required"
      });
    }

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const items = cart.items.map((cartItem) => {
      if (!cartItem.product) {
        throw new Error("Product not found in cart");
      }

      if (cartItem.qty < 1) {
        throw new Error("Invalid product quantity");
      }

      const price = cartItem.product.price;
      if (typeof price !== "number") {
        throw new Error("Invalid product price");
      }

      totalAmount += price * cartItem.qty;

      return {
        product: cartItem.product._id,
        qty: cartItem.qty,
        price
      };
    });

    if (items.length === 0 || totalAmount <= 0) {
      return res.status(400).json({
        message: "Order items invalid"
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      isPaid: paymentMethod === "COD"
    });

    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.qty } }
      );
    }

    cart.items = [];
    await cart.save();

    return apiResponse(res, 201, true, "Order placed successfully", order);
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error.message);
    return res.status(500).json({
      message: error.message || "Order failed"
    });
  }
};

/* ======================================================
   GET MY ORDERS
====================================================== */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product");

    return apiResponse(res, 200, true, "Orders fetched", orders);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
};

/* ======================================================
   GET ORDER BY ID
====================================================== */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return apiResponse(res, 200, true, "Order fetched", order);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch order"
    });
  }
};
