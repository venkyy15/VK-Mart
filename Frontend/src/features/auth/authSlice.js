// src/features/auth/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  signupUser,
  updateProfileApi
} from "../../api/authApi";

/* ================= RESTORE USER ================= */
const userFromStorage = (() => {
  try {
    return JSON.parse(localStorage.getItem("user")); // ✅ single source of truth
  } catch {
    return null;
  }
})();

/* ================= LOGIN ================= */
export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await loginUser(formData);

      // ✅ backend returns inside data
      const userData = res.data.data;

      const storedUser = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        token: userData.token
      };

      // ✅ persist for refresh + all pages
      localStorage.setItem(
        "user",
        JSON.stringify(storedUser)
      );

      return storedUser;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    }
  }
);

/* ================= SIGNUP ================= */
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, thunkAPI) => {
    try {
      const res = await signupUser(formData);
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Signup failed"
      );
    }
  }
);

/* ================= UPDATE PROFILE ================= */
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const res = await updateProfileApi(formData);

      const userData = res.data.data;

      const updatedUser = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        token: userData.token
      };

      // ✅ keep same storage key (VERY IMPORTANT)
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Profile update failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,   // ✅ restore on refresh
    loading: false,
    error: null,
    signupSuccess: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      // ✅ clear persisted auth
      localStorage.removeItem("user");
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* ---------- LOGIN ---------- */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- SIGNUP ---------- */
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.signupSuccess = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE PROFILE ---------- */
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  logout,
  clearAuthError
} = authSlice.actions;

export default authSlice.reducer;
