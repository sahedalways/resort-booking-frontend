"use client";

import { createContext, useContext, useState } from "react";
import { LocalStoreContext } from "../localstorage/LocalStoreContext";
import { http } from "../../services/httpService";
import { isLoggedIn } from "../../helper/auth";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const isLoggedInToken = isLoggedIn();
  const [isSuccessMsg, setIsSuccessMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState("");
  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  const { setAuthUserData } = useContext(LocalStoreContext);

  const changeAvatar = async (formData) => {
    setIsSuccessMsg("");
    setIsErrorMsg("");
    setIsLoadingSubmitting(true);

    try {
      const response = await http.post("profile/change-avatar", formData, {
        headers: {
          Authorization: `Bearer ${isLoggedInToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsSuccessMsg("Avatar updated successfully!");

      setIsLoadingSubmitting(false);

      if (response.data.data) {
        setAuthUserData(response.data.data);
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.error) {
        setIsErrorMsg(errorData.error);
      } else {
        setIsErrorMsg("Something went wrong. Please try again.");
      }
      setIsLoadingSubmitting(false);
      return false;
    }
  };

  const saveProfileData = async (profileData) => {
    setIsSuccessMsg("");
    setIsErrorMsg("");
    setIsLoadingSubmitting(true);

    try {
      const formData = new FormData();
      Object.keys(profileData).forEach((key) => {
        formData.append(key, profileData[key]);
      });

      const response = await http.post("profile/update", formData, {
        headers: {
          Authorization: `Bearer ${isLoggedInToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsSuccessMsg("Profile updated successfully!");
      setIsLoadingSubmitting(false);

      if (response.data.data) {
        setAuthUserData(response.data.data);
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.error) {
        setIsErrorMsg(errorData.error);
      } else {
        setIsErrorMsg("Something went wrong. Please try again.");
      }
      setIsLoadingSubmitting(false);
      return false;
    }
  };

  const getBookingHistory = async () => {
    setIsLoadingBooking(true);
    try {
      const response = await http.get("booking/history", {
        headers: {
          Authorization: `Bearer ${isLoggedInToken}`,
        },
      });

      if (response.data.data) {
        setBookingData(response.data.data);
      }
      setIsLoadingBooking(false);
    } catch (error) {
      const errorData = error.response?.data;
      console.log(errorData.error);
      setIsLoadingBooking(false);
      return false;
    }
  };

  const changePassword = async (passwordData) => {
    setIsLoadingSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("current_password", passwordData.current_password);
      formData.append("new_password", passwordData.new_password);
      formData.append("c_password", passwordData.confirm_password);

      const response = await http.post("profile/change-password", formData, {
        headers: {
          Authorization: `Bearer ${isLoggedInToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoadingSubmitting(false);
      if (response.data?.success) {
        setIsSuccessMsg("Password changed successfully.");
        return true;
      } else {
        setIsErrorMsg(response.data?.message || "Failed to change password.");
        return false;
      }
    } catch (error) {
      const errorData = error.response?.data;
      setIsErrorMsg(
        errorData?.message || "Something went wrong. Please try again."
      );
      setIsLoadingSubmitting(false);
      return false;
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        changeAvatar,
        isSuccessMsg,
        isErrorMsg,
        isLoadingSubmitting,
        setIsErrorMsg,
        setIsSuccessMsg,
        saveProfileData,
        getBookingHistory,
        bookingData,
        isLoadingBooking,
        changePassword,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
