// src/api/axiosInstance.js
import axios from "axios";

/* ================================
   AXIOS INSTANCE
================================ */
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

/* ================================
   REQUEST INTERCEPTOR
   (Attach JWT token)
================================ */
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem("vk_current_user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user?.token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${user.token}`
          };
        }
      }
    } catch (err) {
      console.error("❌ Token read error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   RESPONSE INTERCEPTOR
================================ */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized (401) – Token missing or expired");

      // OPTIONAL BUT PROFESSIONAL:
      // Auto logout if token expired
      localStorage.removeItem("vk_current_user");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
