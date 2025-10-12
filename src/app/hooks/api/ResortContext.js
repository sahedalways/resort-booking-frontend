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

  const getReviews = async (resortId) => {
    try {
      const response = await http.get(`get-reviews/${resortId}`);

      if (response.data.success) {
        return response.data.data.reviews;
      } else {
        toast.error(response.data.message || "Failed to fetch reviews", {
          autoClose: 3000,
          theme: "colored",
        });
        return [];
      }
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
      return [];
    }
  };

  const updateReview = async (reviewData, reviewId) => {
    setIsLoadingSubmitting(true);

    try {
      const response = await http.put(
        `update-review/${reviewId}`,
        {
          star: reviewData.rating,
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
        toast.success("Review updated successfully!", {
          autoClose: 3000,
          theme: "colored",
        });
        setIsLoadingSubmitting(false);
        return response.data.review;
      } else {
        toast.error(response.data.message || "Failed to update review.", {
          autoClose: 3000,
          theme: "colored",
        });
        setIsLoadingSubmitting(false);
        return null;
      }
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
      return null;
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await http.delete(`delete-review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${isLoggedInToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("Review deleted successfully!", {
          autoClose: 3000,
          theme: "colored",
        });
        return true;
      } else {
        toast.error(response.data.message || "Failed to delete review.", {
          autoClose: 3000,
          theme: "colored",
        });
        return false;
      }
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
      return false;
    }
  };

  return (
    <ResortContext.Provider
      value={{
        isLoadingSubmitting,
        saveReview,
        getReviews,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </ResortContext.Provider>
  );
};
