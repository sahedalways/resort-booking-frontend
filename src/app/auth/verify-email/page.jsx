"use client";

import { useEffect } from "react";
import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import VerifyEmailWrapper from "./VerifyEmailWrapper";

const page = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getSiteHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpert"
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
