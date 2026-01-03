// src/features/address/addressSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAddressApi,
  getAddressesApi,
  deleteAddressApi,
  updateAddressApi
} from "../../api/addressApi";

/* ================= UTIL: NORMALIZE ADDRESS ================= */
const normalizeAddress = (addr) => ({
  _id: addr._id,
  fullName: addr.fullName || addr.name || "",
  phone: addr.phone || "",
  addressLine1: addr.addressLine1 || addr.street || addr.address || "",
  addressLine2: addr.addressLine2 || "",
  city: addr.city || "",
  state: addr.state || "",
  pincode: addr.pincode || "",
  country: addr.country || "India"
});

/* ================= FETCH ADDRESSES ================= */
export const fetchAddressesAsync = createAsyncThunk(
  "address/fetchAddresses",
  async (_, thunkAPI) => {
    try {
      const { data } = await getAddressesApi();
      return (data.data || []).map(normalizeAddress);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

/* ================= ADD ADDRESS ================= */
export const addAddressAsync = createAsyncThunk(
  "address/addAddress",
  async (addressData, thunkAPI) => {
    try {
      const { data } = await addAddressApi(addressData);
      return normalizeAddress(data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add address"
      );
    }
  }
);

/* ================= UPDATE ADDRESS ================= */
export const updateAddressAsync = createAsyncThunk(
  "address/updateAddress",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateAddressApi(id, data);
      return normalizeAddress(res.data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update address"
      );
    }
  }
);

/* ================= DELETE ADDRESS ================= */
export const deleteAddressAsync = createAsyncThunk(
  "address/deleteAddress",
  async (id, thunkAPI) => {
    try {
      await deleteAddressApi(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

/* ================= SLICE ================= */
const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null
  },
  reducers: {
    selectAddress(state, action) {
      state.selected = action.payload;
    },
    clearAddressError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchAddressesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddressesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAddressesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.selected = action.payload; // auto-select
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.selected?._id === action.payload._id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (addr) => addr._id !== action.payload
        );
        if (state.selected?._id === action.payload) {
          state.selected = null;
        }
      });
  }
});

export const { selectAddress, clearAddressError } =
  addressSlice.actions;

export default addressSlice.reducer;
