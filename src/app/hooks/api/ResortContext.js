"use client";

import { createContext, useState } from "react";
import { http } from "../../services/httpService";
import { isLoggedIn } from "../../helper/auth";
import { toast } from "react-toastify";

export const ResortContext = createContext();

export const ResortProvider = ({ children }) => {
  const isLoggedInToken = isLoggedIn();
  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);

  const saveReview = async (reviewData, resortId) => {
    setIsLoadingSubmitting(true);

    try {
      const response = await http.post(
        "submit-reviews",
        {
          resort_id: resortId,
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${isLoggedInToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Review submitted successfully!", {
          autoClose: 3000,
          theme: "colored",
        });

        // Update local reviews array if function provided
        if (reviewData.updateLocalReviews) {
          reviewData.updateLocalReviews(response.data.review);
        }
      } else {
        toast.error(response.data.message || "Failed to submit review.", {
          autoClose: 3000,
          theme: "colored",
        });
      }

      setIsLoadingSubmitting(false);
      return true;
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.error) {
        toast.error(errorData.error, { autoClose: 3000, theme: "colored" });
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

  return (
    <ResortContext.Provider
      value={{
        isLoadingSubmitting,
        saveReview,
      }}
    >
      {children}
    </ResortContext.Provider>
  );
};
