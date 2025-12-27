import axiosInstance from "./axiosInstance";

/* =====================================
   AUTH API
===================================== */

// ---------- SIGNUP ----------
export const signupUser = async ({ name, email, password }) => {
  return axiosInstance.post("/auth/signup", {
    name,
    email,
    password
  });
};

// ---------- LOGIN ----------
export const loginUser = async ({ email, password }) => {
  return axiosInstance.post("/auth/login", {
    email,
    password
  });
};

// ---------- GET PROFILE ----------
export const getProfile = async () => {
  return axiosInstance.get("/auth/profile");
};

// ---------- UPDATE PROFILE ----------
export const updateProfileApi = async ({ name }) => {
  return axiosInstance.put("/auth/profile", { name });
};
