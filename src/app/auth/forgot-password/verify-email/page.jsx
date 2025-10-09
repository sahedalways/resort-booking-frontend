"use client";

import { getSiteHeaderData } from "@/src/app/helper/getSiteHeaderData";
import VerifyEmailWrapper from "./VerifyEmailWrapper";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getSiteHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | Email Verification`;
    };

    fetchTitle();
  }, []);
  return (
    <>
      <VerifyEmailWrapper />
    </>
  );
};

export default page;
