// src/features/product/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../../api/productApi";

/* ======================================================
   GET PRODUCTS (with search support)
====================================================== */
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (keyword = "", thunkAPI) => {
    try {
      // ✅ Normalize keyword
      const search = typeof keyword === "string" ? keyword.trim() : "";

      // ✅ ALWAYS send as query param object
      const res = await fetchProducts({
        keyword: search
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load products"
      );
    }
  }
);

/* ======================================================
   GET SINGLE PRODUCT
====================================================== */
export const getProductById = createAsyncThunk(
  "products/getById",
  async (id, thunkAPI) => {
    try {
      const res = await fetchProductById(id);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Product not found"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selected = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* =========================
         ALL PRODUCTS
      ========================= */
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* =========================
         SINGLE PRODUCT
      ========================= */
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
