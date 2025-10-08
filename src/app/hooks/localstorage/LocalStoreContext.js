"use client";

import { createContext, useEffect, useState } from "react";

export const LocalStoreContext = createContext();

export const LocalStoreProvider = ({ children }) => {
  const [authUserData, setAuthUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [forgotPasswordIdentifier, setForgotPasswordIdentifier] =
    useState(null);
  const [authIdentifier, setFAuthIdentifier] = useState(null);
  const [allowVerifyEmail, setAllowVerifyEmail] = useState(null);

  // Load from localStorage once on the client side
  useEffect(() => {
    const storedUserData = localStorage.getItem("bx_user_data");
    const storedUserId = localStorage.getItem("bx_user_id");
    const forgotPasswordIdentifier = localStorage.getItem(
      "bx_forgot_password_identifier"
    );
    const authIdentifier = sessionStorage.getItem("bx_auth_identifier");
    const allowVerEm = sessionStorage.getItem("bx_allow_verify_email");

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

    if (allowVerEm) {
      setAllowVerifyEmail(JSON.parse(allowVerEm));
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
      sessionStorage.setItem(
        "bx_auth_identifier",
        JSON.stringify(authIdentifier)
      );
    } else {
      sessionStorage.removeItem("bx_auth_identifier");
    }

    if (allowVerifyEmail !== null) {
      localStorage.setItem(
        "bx_allow_verify_email",
        JSON.stringify(allowVerifyEmail)
      );
    } else {
      localStorage.removeItem("bx_allow_verify_email");
    }
  }, [
    authUserData,
    userId,
    forgotPasswordIdentifier,
    authIdentifier,
    allowVerifyEmail,
  ]);

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
        setAllowVerifyEmail,
        allowVerifyEmail,
      }}
    >
      {children}
    </LocalStoreContext.Provider>
  );
};
