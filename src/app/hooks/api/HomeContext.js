"use client";

import { createContext, useState } from "react";
import { http } from "../../services/httpService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const router = useRouter();

  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);

  const searchResort = async (data) => {
    setIsLoadingSubmitting(true);
    console.log("data", data);

    try {
      const response = await http.get("search-resort", {
        params: {
          ...data,
          rooms: JSON.stringify(data.rooms),
        },
      });

      if (response.data.success) {
        toast.success("Resort search successful!");
        console.log("Search Result:", response.data.data);
      } else {
        toast.error(response.data.message || "No resorts found.");
      }
    } catch (error) {
      console.error("Search Resort Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsLoadingSubmitting(false);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        isLoadingSubmitting,
        searchResort,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
