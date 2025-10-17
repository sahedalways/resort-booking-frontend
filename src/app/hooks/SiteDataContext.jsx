"use client";
import { createContext, useContext } from "react";

const SiteDataContext = createContext({});

export const SiteDataProvider = ({ headerData, footerData, children }) => {
  return (
    <SiteDataContext.Provider value={{ headerData, footerData }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteDataContext);
