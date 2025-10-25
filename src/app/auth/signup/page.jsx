"use client";

import { useEffect } from "react";
import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import RegisterClient from "./RegisterClient";

export default function Register() {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getSiteHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpert"
      } | Register`;
    };

    fetchTitle();
  }, []);

  return (
    <>
      <RegisterClient />
    </>
  );
}
