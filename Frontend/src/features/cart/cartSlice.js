import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../../api/cartApi";

/* ===============================
   FETCH CART
================================ */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await cartApi.getCart();
      return res?.data?.data?.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

/* ===============================
   ADD TO CART
================================ */
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, qty }, thunkAPI) => {
    try {
      const res = await cartApi.addToCart({ productId, qty });
      return res?.data?.data?.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add item"
      );
    }
  }
);

/* ===============================
   UPDATE QTY
================================ */
export const updateQtyAsync = createAsyncThunk(
  "cart/updateQty",
  async ({ productId, qty }, thunkAPI) => {
    try {
      const res = await cartApi.updateCart({ productId, qty });
      return res?.data?.data?.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

/* ===============================
   REMOVE ITEM
================================ */
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeItem",
  async (productId, thunkAPI) => {
    try {
      const res = await cartApi.removeFromCart(productId);
      return res?.data?.data?.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

/* ===============================
   SLICE
================================ */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    clearCart(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      /* FETCH CART */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD TO CART */
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE QTY */
      .addCase(updateQtyAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      /* REMOVE ITEM */
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
