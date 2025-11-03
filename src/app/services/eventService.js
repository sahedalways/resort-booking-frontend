import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const fetchEventServiceById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/single-event-data/${id}`);
    return res.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch event service data.";
    throw new Error(message);
  }
};
