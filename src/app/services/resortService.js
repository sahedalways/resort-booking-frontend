import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const fetchResortData = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/resort-data?page=${page}`);
    return res.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch resort data";
    throw new Error(message);
  }
};

export const fetchResortById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/single-resort-data/${id}`);
    return res.data.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch resort";
    throw new Error(message);
  }
};

export default fetchResortData;
