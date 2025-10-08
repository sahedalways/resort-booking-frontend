"use client";

import { createContext, useEffect, useState } from "react";

export const LocalStoreContext = createContext();

export const LocalStoreProvider = ({ children }) => {
  const [authUserData, setAuthUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  // Load from localStorage once on the client side
  useEffect(() => {
    const storedUserData = localStorage.getItem("bx_user_data");
    const storedUserId = localStorage.getItem("bx_user_id");

    if (storedUserData) {
      setAuthUserData(JSON.parse(storedUserData));
    }

    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    }
  }, []);

  // Save to localStorage whenever these values change
  useEffect(() => {
    if (authUserData !== null) {
      localStorage.setItem("bx_user_data", JSON.stringify(authUserData));
    } else {
      localStorage.removeItem("bx_user_data");
    }

    if (userId !== null) {
      localStorage.setItem("bx_user_id", JSON.stringify(userId));
    } else {
      localStorage.removeItem("bx_user_id");
    }
  }, [authUserData, userId]);

  return (
    <LocalStoreContext.Provider
      value={{
        authUserData,
        setAuthUserData,
        userId,
        setUserId,
      }}
    >
      {children}
    </LocalStoreContext.Provider>
  );
};
