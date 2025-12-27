// src/api/cartApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// 🔐 Attach token automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

const getCart = () => API.get("/cart");

const addToCart = (data) => API.post("/cart", data);

const updateCart = (data) => API.put("/cart", data);

const removeFromCart = (productId) =>
  API.delete(`/cart/${productId}`);

export default {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
};
