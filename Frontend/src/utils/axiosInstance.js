// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

/* =====================================================
   REQUEST INTERCEPTOR → ATTACH JWT
===================================================== */
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // ❌ Do NOT attach token for auth routes
      if (
        config.url?.includes("/auth/login") ||
        config.url?.includes("/auth/signup")
      ) {
        return config;
      }

      const storedUser = localStorage.getItem("vk_current_user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (err) {
      console.error("Axios token attach error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   RESPONSE INTERCEPTOR → HANDLE 401
===================================================== */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized / Token expired");

      // auto logout
      localStorage.removeItem("vk_current_user");

      // optional redirect (keep commented)
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
