// src/api/productApi.js
import axiosInstance from "./axiosInstance";

// ✅ supports search keyword
export const fetchProducts = (keyword = "") => {
  const query = keyword ? `?keyword=${keyword}` : "";
  return axiosInstance.get(`/products${query}`);
};

export const fetchProductById = (id) => {
  return axiosInstance.get(`/products/${id}`);
};
