import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
