import axios from "axios";

/* AXIOS INSTANCE*/
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

/*ATTACH JWT TOKEN TO REQUEST*/
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem("vk_current_user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("❌ Failed to parse user token", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*RESPONSE ERROR HANDLING*/
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized request (401)");
     }

    return Promise.reject(error);
  }
);

export default axiosInstance;
