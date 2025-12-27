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
    return JSON.parse(localStorage.getItem("user")); // ✅ FIXED KEY
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

      const userData = res.data.data;

      const storedUser = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        token: userData.token
      };

      // ✅ STORE TOKEN WHERE cartApi EXPECTS IT
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

      // ✅ UPDATE SAME KEY
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
    user: userFromStorage,
    loading: false,
    error: null,
    signupSuccess: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // ✅ FIXED
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(signup.fulfilled, (state) => {
        state.signupSuccess = true;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const {
  logout,
  clearAuthError
} = authSlice.actions;

export default authSlice.reducer;
