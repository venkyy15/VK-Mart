// src/api/productApi.js

import axiosInstance from "./axiosInstance";

/* ======================================================
   FETCH PRODUCTS (supports search)
   Works with:
   - fetchProducts("iphone")
   - fetchProducts({ keyword: "iphone" })
====================================================== */
export const fetchProducts = (params = "") => {
  let query = "";

  // ✅ If params is object (new correct way)
  if (typeof params === "object" && params.keyword) {
    query = `?keyword=${encodeURIComponent(params.keyword)}`;
  }

  // ✅ If params is string (backward compatibility)
  if (typeof params === "string" && params.trim()) {
    query = `?keyword=${encodeURIComponent(params.trim())}`;
  }

  return axiosInstance.get(`/products${query}`);
};

/* ======================================================
   FETCH SINGLE PRODUCT
====================================================== */
export const fetchProductById = (id) => {
  return axiosInstance.get(`/products/${id}`);
};
