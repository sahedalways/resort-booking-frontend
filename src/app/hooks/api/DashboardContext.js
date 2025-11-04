"use client";

import { createContext, useContext, useState } from "react";
import { LocalStoreContext } from "../localstorage/LocalStoreContext";
import { http } from "../../services/httpService";
import { isLoggedIn } from "../../helper/auth";
import { toast } from "react-toastify";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const isLoggedInToken = isLoggedIn();
  const [isSuccessMsg, setIsSuccessMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState("");
  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState();
  const [profileData, setProfileData] = useState();

  const { setAuthUserData, setAuthUserProfile } = useContext(LocalStoreContext);

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
      toast.success("Avatar updated successfully!", {
        autoClose: 3000,
        theme: "colored",
      });

      setIsLoadingSubmitting(false);

      if (response.data.data) {
        setAuthUserData(response.data.data);
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.error) {
        toast.error(errorData.error || "An error occured!.", {
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          autoClose: 3000,
          theme: "colored",
        });
      }
      setIsLoadingSubmitting(false);
      return false;
    }
  };

  const saveProfileData = async (profileData) => {
    setIsSuccessMsg("");
    setIsErrorMsg("");
    setIsLoadingSubmitting(true);
    setAuthUserProfile(null);
    setProfileData(null);

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

      toast.success("Profile updated successfully!", {
        autoClose: 3000,
        theme: "colored",
      });

      setIsLoadingSubmitting(false);

      const updatedProfile = response.data.data.profile;

      setProfileData(updatedProfile);
      setAuthUserProfile(response.data.data);

      setAuthUserData((prev) =>
        prev ? { ...prev, ...response.data.data } : response.data.data
      );
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.error) {
        toast.error(errorData.error, {
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          autoClose: 3000,
          theme: "colored",
        });
      }
      setIsLoadingSubmitting(false);
      return false;
    }
  };

  const getProfileOverview = async () => {
    setIsLoading(true);
    try {
      const response = await http.get("/profile/overview", {
        headers: {
          Authorization: `Bearer ${isLoggedInToken}`,
        },
      });

      if (response.data?.data) {
        const { profile, bookings } = response.data.data;
        setAuthUserProfile(profile);
        setProfileData(profile || {});
        setBookingData(bookings || []);
      }
      setIsLoading(false);
    } catch (error) {
      const errorData = error.response?.data;
      console.log(errorData.error);
      setIsLoading(false);
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
        toast.success("Password changed successfully.", {
          autoClose: 3000,
          theme: "colored",
        });

        return true;
      } else {
        toast.error(response.data?.message || "Failed to change password.", {
          autoClose: 3000,
          theme: "colored",
        });

        return false;
      }
    } catch (error) {
      const errorData = error.response?.data;
      toast.error(errorData || "Something went wrong. Please try again.", {
        autoClose: 3000,
        theme: "colored",
      });

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
        getProfileOverview,
        bookingData,
        profileData,
        isLoading,
        changePassword,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
