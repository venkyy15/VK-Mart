// src/features/auth/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  signupUser,
  updateProfileApi
} from "../../api/authApi";

/* ================= RESTORE FROM STORAGE ================= */
const userFromStorage = (() => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
})();

const tokenFromStorage = localStorage.getItem("token");

/* ================= LOGIN ================= */
export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await loginUser(formData);

      // 🔥 backend returns { _id, name, email, token } in data
      const { token, _id, name, email } = res.data.data;

      if (!token) {
        throw new Error("Token not received from server");
      }

      const user = { _id, name, email };

      // ✅ persist separately (VERY IMPORTANT)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { user, token };
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

      // 🔥 backend returns flat object { _id, name, email, token }
      const { token, _id, name, email } = res.data.data;

      const user = { _id, name, email };

      // 🔥 keep storage in sync
      localStorage.setItem("user", JSON.stringify(user));

      if (token) {
        localStorage.setItem("token", token);
      }

      return { user, token };
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
    token: tokenFromStorage,
    loading: false,
    error: null,
    signupSuccess: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      // ✅ clear everything
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
        state.user = action.payload.user;
        state.token = action.payload.token;
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
        state.user = action.payload.user;
        if (action.payload.token) {
          state.token = action.payload.token;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
