"use client";

import { createContext, useEffect, useState } from "react";

export const LocalStoreContext = createContext();

export const LocalStoreProvider = ({ children }) => {
  const ISSERVER = typeof window !== "undefined";

  // Retrieve from localStorage and parse the JSON string into an object
  const [homeData, setHomeData] = useState(
    ISSERVER
      ? JSON.parse(localStorage.getItem("lotus_home_data")) || null
      : null
  );

  const [authUserData, setAuthUserData] = useState(
    ISSERVER
      ? JSON.parse(localStorage.getItem("lotus_auth_user_data")) || null
      : null
  );

  const [userId, setUserId] = useState(
    ISSERVER ? localStorage.getItem("lotus_user_id") || null : null
  );

  const [propertyId, setIsPropertyId] = useState(
    ISSERVER ? localStorage.getItem("lotus_property_id") || null : null
  );

  const [forgotPasswordIdentifier, setForgotPasswordIdentifier] = useState(
    ISSERVER ? sessionStorage.getItem("lotus_fp_identifier") || null : null
  );

  // Update localStorage whenever authUserData or userId changes
  useEffect(() => {
    if (authUserData) {
      localStorage.setItem(
        "lotus_auth_user_data",
        JSON.stringify(authUserData)
      );
    } else {
      localStorage.removeItem("lotus_auth_user_data");
    }

    if (homeData) {
      localStorage.setItem("lotus_home_data", JSON.stringify(homeData));
    } else {
      localStorage.removeItem("lotus_home_data");
    }

    localStorage.setItem("lotus_user_id", userId);
    localStorage.setItem("lotus_property_id", propertyId);

    sessionStorage.setItem("lotus_fp_identifier", forgotPasswordIdentifier);
  }, [authUserData, userId, homeData, forgotPasswordIdentifier, propertyId]);

  return (
    <LocalStoreContext.Provider
      value={{
        authUserData,
        setAuthUserData,
        userId,
        setUserId,
        homeData,
        setHomeData,
        forgotPasswordIdentifier,
        setForgotPasswordIdentifier,
        setIsPropertyId,
        propertyId,
      }}
    >
      {children}
    </LocalStoreContext.Provider>
  );
};
