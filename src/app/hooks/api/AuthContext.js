"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { LocalStoreContext } from "../localstorage/LocalStoreContext";
import { http } from "../../services/httpService";
import { isLoggedIn } from "../../helper/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const isLoggedInToken = isLoggedIn();
  const [isRegisterSuccessMsg, setIsRegisterSuccessMsg] = useState(false);
  const [isRegisterErrorMsg, setIsRegisterErrorMsg] = useState("");
  const [isLogoutMessage, setLogoutMessage] = useState("");
  const [isLoginSuccessMsg, setIsLoginSuccessMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isRegisteringLoading, setIsRegisteringLoading] = useState(false);

  const [isLoginErrorMsg, setIsLoginErrorMsg] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [isSearchAccErrorMsg, setIsSearchAccErrorMsg] = useState("");
  const [isFindingAccountLoading, setIsSearchAccountLoading] = useState(false);

  const [isResendOtpSuccessMsg, setIsResendOtpSuccessMsg] = useState("");
  const [isMatchOtpErrorMsg, setIsMatchOtpErrorMsg] = useState("");
  const [isMatchOtpLoading, setIsMatchOtpLoading] = useState(false);
  const [isResendOtpLoading, setIsResendOtpLoading] = useState(false);

  const [isChangePasswordSuccessMsg, setIsChangePasswordSuccessMsg] =
    useState("");
  const [isChangePasswordErrorMsg, setIsChangePasswordErrorMsg] = useState("");
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

  const {
    setAuthUserData,
    setUserId,
    setForgotPasswordIdentifier,
    forgotPasswordIdentifier,
    authIdentifier,
    setFAuthIdentifier,
    setAllowVerifyEmail,
  } = useContext(LocalStoreContext);

  const register = async function (
    f_name,
    l_name,
    email,
    phone,
    password,
    confirmPassword
  ) {
    setEmailError("");
    setPhoneNumberError("");
    setIsRegisterSuccessMsg("");
    setIsRegisterErrorMsg("");
    setIsRegisteringLoading(true);
    http
      .post("register", {
        f_name: f_name,
        l_name: l_name,
        email: email,
        phone_no: phone,
        password: password,
        password_confirmation: confirmPassword,
      })

      .then((res) => {
        setIsRegisterSuccessMsg(res.data.message);
        setIsRegisteringLoading(false);
        setFAuthIdentifier(res.data.data.email);
        setAllowVerifyEmail(true);

        router.push("/auth/verify-email");
      })
      .catch((error) => {
        setAllowVerifyEmail(false);
        setIsRegisteringLoading(false);

        const errorData = error.response?.data;

        if (errorData?.error) {
          setIsRegisterErrorMsg(errorData.error);
        } else if (errorData?.data?.data) {
          setIsRegisterErrorMsg(errorData.data.data);
        } else {
          setIsRegisterErrorMsg("Something went wrong. Please try again.");
        }

        if (errorData?.errors?.email?.[0]) {
          setEmailError(errorData.errors.email[0]);
          setTimeout(() => setEmailError(""), 5000);
          setIsRegisterErrorMsg("");
        }

        const phoneError =
          errorData?.errors?.phone_no?.[0] ||
          errorData?.errors?.phone_number?.[0];

        if (phoneError) {
          setPhoneNumberError(phoneError);
          setTimeout(() => setPhoneNumberError(""), 5000);
          setIsRegisterErrorMsg("");
        }

        return false;
      });
  };

  const login = async function (email, password) {
    setIsLoginErrorMsg("");
    setIsLoginLoading(true);
    http
      .post("login", {
        email: email,
        password: password,
      })

      .then((res) => {
        setIsLoginLoading(false);

        let userData = res.data.data;

        if (
          res.data.message === "Email not verified. OTP sent to your email."
        ) {
          setFAuthIdentifier(userData.email);
          setAllowVerifyEmail(true);
          router.push(`/auth/verify-email`);
        } else if (res.data.message === "User login successfully.") {
          setIsMatchOtpLoading(false);
          setFAuthIdentifier(null);
          setAllowVerifyEmail(false);
          let userToken = userData.token.plainTextToken;
          let userId = userData.id;

          Cookies.set("bx_auth_token", userToken, { expires: 7 });

          setAuthUserData(userData);
          setUserId(userId);
          setIsLoginSuccessMsg("You have logged in successfully.");
          router.push("/user/dashboard");
        } else {
          setIsLoginErrorMsg("Unexpected response from server.");
        }
      })
      .catch((error) => {
        setIsLoginLoading(false);
        try {
          const errorData = error.response?.data;

          if (errorData.data.error) {
            setIsLoginErrorMsg(errorData.data.error);
          } else {
            setIsLoginErrorMsg("Something went wrong. Please try again.");
          }
        } catch (e) {
          setIsLoginErrorMsg("Something went wrong. Please try again.", e);
        }
      });
  };

  const handleLogout = async () => {
    try {
      await http.post(
        "logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${isLoggedInToken}`,
          },
        }
      );

      // Clear client-side storage
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove("bx_auth_token");

      setLogoutMessage("You have successfully logged out.");

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const searchAccount = async function (identity) {
    setIsSearchAccErrorMsg("");
    setIsSearchAccountLoading(true);

    try {
      const res = await http.post("forgot-password", {
        email: identity,
      });
      setIsSearchAccountLoading(false);

      setFAuthIdentifier(res.data.data.email);
      setAllowVerifyEmail(true);

      router.push("/auth/forgot-password/verify-email");
    } catch (error) {
      const errorData = error.response.data;

      setIsSearchAccountLoading(false);
      if (errorData.data.email) {
        setIsSearchAccErrorMsg(errorData.data.email[0]);
        setTimeout(() => {
          setIsSearchAccErrorMsg("");
        }, 5000);
      } else if (errorData.data.phone_number) {
        setIsSearchAccErrorMsg(errorData.data.phone_number[0]);
        setTimeout(() => {
          setIsSearchAccErrorMsg("");
        }, 5000);
      } else {
        setIsSearchAccErrorMsg(errorData.data.error);
        setTimeout(() => {
          setIsSearchAccErrorMsg("");
        }, 5000);
      }
    }
  };

  const verifyEmail = async function (otp) {
    setIsMatchOtpErrorMsg("");
    setIsMatchOtpLoading(true);
    http
      .post("verify-email-otp", {
        otp: otp,
        email: authIdentifier,
      })

      .then((res) => {
        setIsMatchOtpLoading(false);
        setFAuthIdentifier(null);
        setAllowVerifyEmail(false);
        let userData = res.data.data;
        let userToken = userData.token;
        let userId = userData.id;

        Cookies.set("bx_auth_token", userToken, { expires: 7 });

        setAuthUserData(userData);
        setUserId(userId);
        setIsLoginSuccessMsg("You have logged in successfully.");
        router.push("/user/dashboard");
      })
      .catch((error) => {
        const errorData = error.response.data;
        setIsMatchOtpLoading(false);
        setIsMatchOtpErrorMsg(errorData.message);
        setTimeout(() => {
          setIsMatchOtpErrorMsg("");
        }, 5000);
      });
  };

  const verifyEmailForForgotPassword = async function (otp) {
    setIsMatchOtpErrorMsg("");
    setIsMatchOtpLoading(true);
    http
      .post("forgot-password/match-otp", {
        otp: otp,
        email: authIdentifier,
      })

      .then((res) => {
        setIsMatchOtpLoading(false);
        setFAuthIdentifier(null);
        setForgotPasswordIdentifier(res.data.data.identifier);

        router.push("/auth/forgot-password/change-password");
      })
      .catch((error) => {
        const errorData = error.response.data;
        setIsMatchOtpLoading(false);
        setIsMatchOtpErrorMsg(errorData.message);
        setTimeout(() => {
          setIsMatchOtpErrorMsg("");
        }, 5000);
      });
  };

  const resendOtp = async function () {
    setIsMatchOtpErrorMsg("");
    setIsResendOtpLoading(true);

    try {
      const res = await http.post("resend-otp", {
        email: authIdentifier,
      });

      setIsResendOtpLoading(false);
      setIsResendOtpSuccessMsg("OTP has been resent successfully!");

      setTimeout(() => {
        setIsResendOtpSuccessMsg("");
      }, 5000);

      return true;
    } catch (err) {
      setIsResendOtpLoading(false);
      setIsMatchOtpErrorMsg("Failed to resend OTP. Please try again.");
      console.error(err);
      return false;
    }
  };

  const changePassword = async function (password, confirmPassword) {
    setIsChangePasswordSuccessMsg("");
    setIsChangePasswordErrorMsg("");
    setIsChangePasswordLoading(true);
    http
      .post("change-password", {
        identifier: forgotPasswordIdentifier,
        password: password,
        c_password: confirmPassword,
      })

      .then((res) => {
        setIsChangePasswordLoading(false);
        setAllowVerifyEmail(false);
        let userData = res.data;

        setIsChangePasswordSuccessMsg(userData.message);
        setTimeout(() => {
          setIsChangePasswordSuccessMsg("");
        }, 8000);
        setForgotPasswordIdentifier(null);
        router.push("/auth/login");
      })
      .catch((error) => {
        const errorData = error.response.data;
        setIsChangePasswordSuccessMsg("");
        setIsChangePasswordLoading(false);
        setIsChangePasswordErrorMsg(errorData.data.error);
        setTimeout(() => {
          setIsChangePasswordErrorMsg("");
        }, 5000);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        isRegisterSuccessMsg,
        isRegisterErrorMsg,
        isRegisteringLoading,
        setIsRegisterSuccessMsg,
        setIsRegisterErrorMsg,
        setIsRegisteringLoading,
        emailError,
        phoneNumberError,
        setPhoneNumberError,
        setEmailError,
        login,
        isLoginErrorMsg,
        isLoginLoading,
        handleLogout,
        searchAccount,
        isSearchAccErrorMsg,
        isFindingAccountLoading,
        isMatchOtpLoading,
        isMatchOtpErrorMsg,
        changePassword,
        isChangePasswordLoading,
        isChangePasswordErrorMsg,
        isChangePasswordSuccessMsg,
        verifyEmail,
        resendOtp,
        isResendOtpSuccessMsg,
        isResendOtpLoading,
        setIsResendOtpSuccessMsg,
        setIsMatchOtpErrorMsg,
        isLogoutMessage,
        setLogoutMessage,
        setIsLoginErrorMsg,
        isLoginSuccessMsg,
        setIsLoginSuccessMsg,
        setIsSearchAccErrorMsg,
        verifyEmailForForgotPassword,
        setIsChangePasswordErrorMsg,
        setIsChangePasswordSuccessMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
