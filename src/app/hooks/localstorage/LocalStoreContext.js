"use client";

import { createContext, useEffect, useState } from "react";

export const LocalStoreContext = createContext();

export const LocalStoreProvider = ({ children }) => {
  const [authUserData, setAuthUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [forgotPasswordIdentifier, setForgotPasswordIdentifier] =
    useState(null);
  const [authIdentifier, setFAuthIdentifier] = useState(null);

  // Load from localStorage once on the client side
  useEffect(() => {
    const storedUserData = localStorage.getItem("bx_user_data");
    const storedUserId = localStorage.getItem("bx_user_id");
    const forgotPasswordIdentifier = localStorage.getItem(
      "bx_forgot_password_identifier"
    );
    const authIdentifier = localStorage.getItem("bx_auth_identifier");

    if (storedUserData) {
      setAuthUserData(JSON.parse(storedUserData));
    }

    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    }

    if (forgotPasswordIdentifier) {
      setForgotPasswordIdentifier(JSON.parse(forgotPasswordIdentifier));
    }

    if (authIdentifier) {
      setFAuthIdentifier(JSON.parse(authIdentifier));
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

    if (forgotPasswordIdentifier !== null) {
      localStorage.setItem(
        "bx_forgot_password_identifier",
        JSON.stringify(forgotPasswordIdentifier)
      );
    } else {
      localStorage.removeItem("bx_forgot_password_identifier");
    }

    if (authIdentifier !== null) {
      localStorage.setItem(
        "bx_auth_identifier",
        JSON.stringify(authIdentifier)
      );
    } else {
      localStorage.removeItem("bx_auth_identifier");
    }
  }, [authUserData, userId, forgotPasswordIdentifier, authIdentifier]);

  return (
    <LocalStoreContext.Provider
      value={{
        authUserData,
        setAuthUserData,
        userId,
        setUserId,
        setForgotPasswordIdentifier,
        forgotPasswordIdentifier,
        authIdentifier,
        setFAuthIdentifier,
      }}
    >
      {children}
    </LocalStoreContext.Provider>
  );
};
