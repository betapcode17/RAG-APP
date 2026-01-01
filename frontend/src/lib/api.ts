import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// (optional) interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err.response?.data);
    return Promise.reject(err);
  }
);

export default api;
