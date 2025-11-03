"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHeaderData = async () => {
    try {
      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
        }/header-data`
      );
      setHeaderData(res.data.data);
    } catch (error) {
      console.error("Header Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderData();
  }, []);

  return (
    <HeaderContext.Provider value={{ headerData, loading }}>
      {children}
    </HeaderContext.Provider>
  );
};
