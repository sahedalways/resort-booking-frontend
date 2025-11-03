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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/footer-data`
      );

      setFooterData(response.data.data);
      setLoading(false);
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
