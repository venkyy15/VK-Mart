// src/features/product/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../../api/productApi";

// ✅ GET PRODUCTS (with search)
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (keyword = "", thunkAPI) => {
    try {
      const res = await fetchProducts(keyword);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load products"
      );
    }
  }
);

// ✅ GET SINGLE PRODUCT
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
      // all products
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

      // single product
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
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
