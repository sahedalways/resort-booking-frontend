"use client";

import { createContext, useState } from "react";
import { http } from "../../services/httpService";
import { isLoggedIn } from "../../helper/auth";
import { toast } from "react-toastify";

export const ResortContext = createContext();

export const ResortProvider = ({ children }) => {
  const isLoggedInToken = isLoggedIn();
  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);
  const [isResortLoading, setIsResortLoading] = useState(false);
  const [resortsInfo, setResortsInfo] = useState();
  const [resortDetails, setResortDetails] = useState(null);

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

  // ✅ Fetch all resorts (pagination handled automatically)
  const fetchAllResorts = async (page = 1) => {
    setIsResortLoading(true);

    try {
      const response = await http.get(`resort-data?page=${page}`);
      const data = response.data.data;

      setResortsInfo((prev) => {
        if (page === 1 || !prev) {
          return data;
        } else {
          return {
            resort_info: [...prev.resort_info, ...data.resort_info],
            pagination: data.pagination,
          };
        }
      });

      return data;
    } catch (error) {
      console.error("Failed to fetch resort data:", error.message);
      return {
        resort_info: [],
        pagination: { current_page: page, last_page: 1 },
      };
    } finally {
      setIsResortLoading(false);
    }
  };

  // ✅ Fetch single resort by ID
  const fetchResortById = async (id) => {
    setIsResortLoading(true);
    try {
      const response = await http.get(`single-resort-data/${id}`);
      setResortDetails(response.data.data);
      console.log("response.data.data", response.data.data);
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch resort details";
      toast.error(message, { theme: "colored" });
      return null;
    } finally {
      setIsResortLoading(false);
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
        resortsInfo,
        resortDetails,
        isResortLoading,
        fetchAllResorts,
        fetchResortById,
      }}
    >
      {children}
    </ResortContext.Provider>
  );
};
