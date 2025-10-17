import axios from "axios";

const fetchHeaderData = async () => {
  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
      }/header-data`
    );

    return res.data.data;
  } catch (error) {
    return null;
  }
};

export default fetchHeaderData;
