// src/api/cartApi.js
import axiosInstance from "./axiosInstance";

/* ================= CART APIS ================= */
const getCart = () => axiosInstance.get("/cart");

const addToCart = (data) => axiosInstance.post("/cart", data);

const updateCart = (data) => axiosInstance.put("/cart", data);

const removeFromCart = (productId) =>
  axiosInstance.delete(`/cart/${productId}`);

/* ================= EXPORT ================= */
export default {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
};
