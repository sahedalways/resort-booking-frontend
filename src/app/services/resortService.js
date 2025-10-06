import axios from "axios";

const fetchResortData = async (page = 1) => {
  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
      }/resort-data?page=${page}`
    );

    return res.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch resort data";
    throw new Error(message);
  }
};

export default fetchResortData;
