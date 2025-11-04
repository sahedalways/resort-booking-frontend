"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHeaderData = async () => {
    try {
      const cacheKey = "headerData";
      const cacheTimeKey = "headerDataTime";

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);

      const now = Date.now();
      const maxAge = 300 * 1000;

      if (cachedData && cachedTime && now - cachedTime < maxAge) {
        setHeaderData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
        }/header-data`
      );

      const data = res.data.data;
      setHeaderData(data);

      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimeKey, now.toString());
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
