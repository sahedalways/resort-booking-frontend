"use client";

import { useEffect } from "react";
import DashboardWrapper from "./DashboardWrapper";
import fetchHeaderData from "../../services/headerService";

const Page = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await fetchHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | Dashboard`;
    };

    fetchTitle();
  }, []);

  return <DashboardWrapper />;
};

export default Page;
