"use client";

import { useEffect } from "react";

import LoginClient from "./LoginClient";
import { getSiteHeaderData } from "../../helper/getSiteHeaderData";

const Page = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getSiteHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | Login`;
    };

    fetchTitle();
  }, []);

  return <LoginClient />;
};

export default Page;
