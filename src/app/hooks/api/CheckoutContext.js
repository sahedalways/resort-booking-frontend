"use client";

import { createContext, useState } from "react";
import { http } from "../../services/httpService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const router = useRouter();

  const [isSuccessMsg, setIsSuccessMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState("");
  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);

  const saveBookingInfo = async (checkoutData, isLoggedInToken) => {
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
        checkBookingStatus(bookingId, isLoggedInToken);
      }, 20000);
    } catch (error) {
      setIsLoadingAnimation(false);

      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      toast.error(errorMessage);

      setIsLoadingSubmitting(false);
    }
  };

  const checkBookingStatus = async (bookingId, isLoggedInToken) => {
    try {
      const statusResponse = await http.get(
        `checkout/booking-status/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${isLoggedInToken}`,
          },
        }
      );

      handleBookingStatus(statusResponse, isLoggedInToken);
    } catch (statusError) {
      toast.error("Error fetching booking status. Please try again.");
    }
  };

  const handleBookingStatus = (statusResponse, isLoggedInToken) => {
    if (statusResponse.data.success) {
      const bookingStatus = statusResponse.data.data.booking.status;
      const amount = statusResponse.data.data.booking.amount;
      const bookingId = statusResponse.data.data.booking.id;

      setIsLoadingAnimation(false);

      if (bookingStatus === "cancelled") {
        toast.error(
          "❌ Booking has been cancelled. Please try another room or resort."
        );

        router.push("/resorts");
      } else {
        payWithBkash(amount, bookingId, isLoggedInToken);
      }
    } else {
      toast.error("Failed to fetch booking status.");
    }
  };

  const payWithBkash = async (amount, bookingId, isLoggedInToken) => {
    try {
      const createRes = await http.post(
        "bkash/create-payment",
        {
          amount,
          bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${isLoggedInToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!createRes.data.paymentID) {
        toast.error("❌ Failed to initiate bKash payment. Please try again.");
        return;
      }

      const { authorizationURL } = createRes.data;
      if (authorizationURL) {
        window.location.href = authorizationURL;
      }
    } catch (error) {
      console.error("bKash Payment Error:", error);

      const errorMessage =
        error.response?.data?.error ||
        "bKash payment failed. Please try again.";
      toast.error(errorMessage);
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
