import axios from "axios";

const fetchHomeData = async () => {
  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
      }/home-data`
    );

    return res.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to fetch home data";
    throw new Error(message);
  }
};

export default fetchHomeData;
