"use client";

import { createContext, useState } from "react";
import { http } from "../../services/httpService";
import { isLoggedIn } from "../../helper/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const router = useRouter();
  const isLoggedInToken = isLoggedIn();
  const [isSuccessMsg, setIsSuccessMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState("");
  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);

  const saveBookingInfo = async (checkoutData) => {
    setIsSuccessMsg("");

    setIsLoadingSubmitting(true);
    setIsLoadingAnimation(false);

    try {
      const formData = new FormData();
      Object.keys(checkoutData).forEach((key) => {
        formData.append(key, checkoutData[key]);
      });

      const response = await http.post("checkout/submit-booking", formData, {
        headers: {
          Authorization: `Bearer ${isLoggedInToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response.data", response.data.data.booking_id);

      setIsLoadingSubmitting(false);
      setIsLoadingAnimation(true);

      if (!response.data.success) {
        toast.error("❌ Booking failed. Please try again.");
      }

      const bookingId = response.data.data.booking_id;

      setTimeout(() => {
        checkBookingStatus(bookingId);
      }, 2000);
    } catch (error) {
      setIsLoadingAnimation(false);
      const errorData = error.response?.data;

      if (errorData?.error) {
        toast.error(errorData.error);
      } else {
        toast.error("Something went wrong. Please try again.");
        setIsErrorMsg("Something went wrong. Please try again.");
      }

      setIsLoadingSubmitting(false);
    }
  };

  const checkBookingStatus = async (bookingId) => {
    try {
      const statusResponse = await http.get(
        `checkout/booking-status/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${isLoggedInToken}`,
          },
        }
      );

      handleBookingStatus(statusResponse);
    } catch (statusError) {
      toast.error("Error fetching booking status. Please try again.");
    }
  };

  const handleBookingStatus = (statusResponse) => {
    if (statusResponse.data.success) {
      const bookingStatus = statusResponse.data.data.booking.status;
      setIsLoadingAnimation(false);

      if (bookingStatus === "cancelled") {
        toast.error("❌ Booking has been cancelled.");

        setTimeout(() => {
          router.push("/resorts");
        }, 2000);
      } else {
        toast.success(`✅ Booking status: ${bookingStatus}`);
      }
    } else {
      toast.error("Failed to fetch booking status.");
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        isSuccessMsg,
        isErrorMsg,
        isLoadingSubmitting,
        setIsErrorMsg,
        setIsSuccessMsg,
        saveBookingInfo,
        isLoadingAnimation,
        setIsLoadingAnimation,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
