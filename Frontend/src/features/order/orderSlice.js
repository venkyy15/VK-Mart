// src/features/order/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* =====================================================
   PLACE ORDER → POST /api/orders
===================================================== */
export const placeOrderAsync = createAsyncThunk(
  "orders/placeOrder",
  async ({ shippingAddress, paymentMethod }, thunkAPI) => {
    try {
      if (!shippingAddress) {
        throw new Error("Shipping address missing");
      }

      if (!paymentMethod) {
        throw new Error("Payment method missing");
      }

      /* =================================================
         ✅ NORMALIZE ADDRESS (PERMANENT FIX)
         Backend expects exact structure → this guarantees it
      ================================================= */
      const normalizedAddress = {
        fullName: shippingAddress.fullName || "",
        phone: shippingAddress.phone || "",
        addressLine1:
          shippingAddress.addressLine1 ||
          shippingAddress.address ||
          "",
        addressLine2: shippingAddress.addressLine2 || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        pincode: shippingAddress.pincode || "",
        country: shippingAddress.country || "India"
      };

      const response = await axiosInstance.post("/orders", {
        shippingAddress: normalizedAddress,
        paymentMethod
      });

      // apiResponse format → { success, message, data }
      return response.data?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to place order"
      );
    }
  }
);

/* =====================================================
   FETCH MY ORDERS → GET /api/orders/my
===================================================== */
export const fetchOrdersAsync = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/orders/my");
      return response.data?.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* =====================================================
   SLICE
===================================================== */
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    clearOrders(state) {
      state.list = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PLACE ORDER ---------- */
      .addCase(placeOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Latest order on top (safe)
        if (action.payload) {
          state.list.unshift(action.payload);
        }
      })
      .addCase(placeOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH ORDERS ---------- */
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
