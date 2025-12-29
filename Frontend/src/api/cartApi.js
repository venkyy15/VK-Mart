// src/api/cartApi.js
import axios from "axios";

/* ================= AXIOS INSTANCE ================= */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

/* ================= ATTACH TOKEN (GLOBAL) ================= */
API.interceptors.request.use(
  (config) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (err) {
      // silent fail (no break)
      console.error("Token parse error", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= CART APIS ================= */
const getCart = () => API.get("/cart");

const addToCart = (data) => API.post("/cart", data);

const updateCart = (data) => API.put("/cart", data);

const removeFromCart = (productId) =>
  API.delete(`/cart/${productId}`);

/* ================= EXPORT ================= */
export default {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
};
