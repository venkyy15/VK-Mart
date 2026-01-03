// src/api/authApi.js

import axiosInstance from "./axiosInstance";

/* =====================================
   AUTH API SERVICES
===================================== */

/* ---------- SIGNUP ---------- */
export const signupUser = async ({ name, email, password }) => {
  const response = await axiosInstance.post("/auth/signup", {
    name,
    email,
    password
  });

  return response; // authSlice handles response.data
};

/* ---------- LOGIN ---------- */
export const loginUser = async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password
  });

  return response; // IMPORTANT: return full axios response
};

/* ---------- GET PROFILE ---------- */
export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response;
};

/* ---------- UPDATE PROFILE ---------- */
export const updateProfileApi = async ({ name }) => {
  const response = await axiosInstance.put("/auth/profile", {
    name
  });

  return response;
};

/* ---------- CHANGE PASSWORD ---------- */
export const changePasswordApi = async (data) => {
  const response = await axiosInstance.put(
    "/auth/change-password",
    data
  );

  return response;
};

/* ---------- ACTIVE SESSIONS ---------- */
export const getSessionsApi = async () => {
  const response = await axiosInstance.get("/auth/sessions");
  return response;
};
