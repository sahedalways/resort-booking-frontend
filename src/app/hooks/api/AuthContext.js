"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { LocalStoreContext } from "../localstorage/LocalStoreContext";
import { http } from "../../services/httpService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isRegisterSuccessMsg, setIsRegisterSuccessMsg] = useState(false);
  const [isRegisterErrorMsg, setIsRegisterErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isRegisteringLoading, setIsRegisteringLoading] = useState(false);

  const [isLoginErrorMsg, setIsLoginErrorMsg] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [isSearchAccErrorMsg, setIsSearchAccErrorMsg] = useState("");
  const [isFindingAccountLoading, setIsSearchAccountLoading] = useState(false);

  const [isMatchOtpErrorMsg, setIsMatchOtpErrorMsg] = useState("");
  const [isMatchOtpLoading, setIsMatchOtpLoading] = useState(false);

  const [isChangePasswordSuccessMsg, setIsChangePasswordSuccessMsg] =
    useState("");
  const [isChangePasswordErrorMsg, setIsChangePasswordErrorMsg] = useState("");
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    setAuthUserData,
    setUserId,
    setForgotPasswordIdentifier,
    forgotPasswordIdentifier,
  } = useContext(LocalStoreContext);

  useEffect(() => {
    const token = Cookies.get("bx_auth_token");
    setIsLoggedIn(!!token);
  }, []);

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
      })
      .catch((error) => {
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
      })
      .catch((error) => {
        setIsLoginLoading(false);
        try {
          const errorData = error.response?.data;

          if (errorData?.message === "Email or Password is incorrect!") {
            setIsLoginErrorMsg(errorData?.message);
          } else {
            setIsLoginErrorMsg("Something went wrong. Please try again.");
          }
        } catch (e) {
          setIsLoginErrorMsg("Something went wrong. Please try again.", e);
        }
      });
  };

  const handleLogout = () => {
    http
      .post("logout")

      .then((res) => {
        console.log("Logout successful", res);
        localStorage.clear();
        Cookies.remove("bx_auth_token");
        setIsLoggedIn(false);
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchAccount = async function (identity) {
    setIsSearchAccErrorMsg("");
    setIsSearchAccountLoading(true);

    let email = null;
    let phoneNumber = null;

    if (/\S+@\S+\.\S+/.test(identity)) {
      email = identity;
    } else if (/^\d{10,15}$/.test(identity)) {
      phoneNumber = identity;
    } else {
      setIsSearchAccountLoading(false);
      setIsSearchAccErrorMsg("Invalid email or phone number.");
      setTimeout(() => {
        setIsSearchAccErrorMsg("");
      }, 5000);

      return;
    }

    try {
      const res = await http.post("forgot-password", {
        email: email,
        phone_number: phoneNumber,
      });
      console.log("successful", res);
      setIsSearchAccountLoading(false);
      router.push("/login/forgot-password/match-otp");
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
        setIsSearchAccErrorMsg(errorData.message);
        setTimeout(() => {
          setIsSearchAccErrorMsg("");
        }, 5000);
      }
    }
  };

  const matchOtp = async function (otp) {
    setIsMatchOtpErrorMsg("");
    setIsMatchOtpLoading(true);
    http
      .post("match-otp", {
        otp: otp,
      })

      .then((res) => {
        setIsMatchOtpLoading(false);
        let userData = res.data;

        setForgotPasswordIdentifier(userData.identifier);

        router.push("/login/forgot-password/change-password");
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
        let userData = res.data;

        setIsChangePasswordSuccessMsg(userData.message);
        setTimeout(() => {
          setIsChangePasswordSuccessMsg("");
        }, 8000);
        setForgotPasswordIdentifier(null);
        router.push("/login");
      })
      .catch((error) => {
        const errorData = error.response.data;
        setIsChangePasswordSuccessMsg("");
        setIsChangePasswordLoading(false);
        setIsChangePasswordErrorMsg(errorData.message);
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
        isLoggedIn,
        searchAccount,
        isSearchAccErrorMsg,
        isFindingAccountLoading,
        matchOtp,
        isMatchOtpLoading,
        isMatchOtpErrorMsg,
        changePassword,
        isChangePasswordLoading,
        isChangePasswordErrorMsg,
        isChangePasswordSuccessMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
