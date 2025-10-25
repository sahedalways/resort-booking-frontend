"use client";

import { Suspense, useEffect } from "react";

import LoginClient from "./LoginClient";
import { getSiteHeaderData } from "../../helper/getSiteHeaderData";

const Page = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getSiteHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpert"
      } | Login`;
    };

    fetchTitle();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
};

export default Page;
