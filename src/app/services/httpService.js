import axios from "axios";
import Cookies from "js-cookie";

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
    if (error.response?.status === 401) {
      Cookies.remove("bx_auth_token");
      window.location.href = "/login";
    }
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
