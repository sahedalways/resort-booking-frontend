"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FooterContext = createContext();

export const FooterProvider = ({ children }) => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  // footer data fetch function
  const fetchFooterData = async () => {
    try {
      const cached = localStorage.getItem("footerData");
      const cachedTime = localStorage.getItem("footerDataTime");

      const now = Date.now();
      const maxAge = 300 * 1000;

      if (cached && cachedTime && now - cachedTime < maxAge) {
        setFooterData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/footer-data`
      );

      const data = response.data.data;
      setFooterData(data);

      localStorage.setItem("footerData", JSON.stringify(data));
      localStorage.setItem("footerDataTime", now.toString());
    } catch (error) {
      console.error("Footer Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  return (
    <FooterContext.Provider value={{ footerData, loading }}>
      {children}
    </FooterContext.Provider>
  );
};
