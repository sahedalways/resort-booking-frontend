"use client";

import { createContext, useEffect, useState } from "react";
import { http } from "../../services/httpService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const router = useRouter();

  const [isLoadingSubmitting, setIsLoadingSubmitting] = useState(false);
  const [homeData, setHomeData] = useState(null);
  const [homeLoading, setHomeLoading] = useState(true);

  const searchResort = async (data) => {
    setIsLoadingSubmitting(true);

    try {
      const response = await http.get("search-resort", {
        params: {
          ...data,
          rooms: JSON.stringify(data.rooms),
        },
      });

      if (response.data.success) {
        toast.success(`Resort & Room found! `);

        const searchData = response.data.data;
        router.push(`/resorts/${searchData}`);
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

  const fetchHomeData = async () => {
    try {
      setHomeLoading(true);
      const response = await http.get("home-data");
      if (response.data?.data) {
        setHomeData(response.data.data);
      } else {
        toast.error("Failed to load home data.");
      }
    } catch (error) {
      console.error("Home Data Fetch Error:", error);
      toast.error("Failed to fetch home data.");
    } finally {
      setHomeLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        isLoadingSubmitting,
        searchResort,
        homeData,
        homeLoading,
        refetchHomeData: fetchHomeData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
