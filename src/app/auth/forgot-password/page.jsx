"use client";

import { useEffect } from "react";
import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import ForgotPasswordWrapper from "./ForgotPasswordWrapper";

const page = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getSiteHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | Forgot Password`;
    };

    fetchTitle();
  }, []);
  return (
    <>
      <ForgotPasswordWrapper />
    </>
  );
};

export default page;
