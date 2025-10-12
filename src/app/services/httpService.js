import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },

  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
