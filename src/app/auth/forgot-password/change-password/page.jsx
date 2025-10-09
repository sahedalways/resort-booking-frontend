"use client";

import { getSiteHeaderData } from "@/src/app/helper/getSiteHeaderData";
import ChangePasswordWrapper from "./ChangePasswordWrapper";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getSiteHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | Change Password`;
    };

    fetchTitle();
  }, []);

  return (
    <>
      <ChangePasswordWrapper />
    </>
  );
};

export default page;
