"use client";

import { useEffect } from "react";
import ContactClient from "./ContactClient";
import fetchHeaderData from "../services/headerService";

const page = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await fetchHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | Contact Us`;
    };

    fetchTitle();
  }, []);

  return <ContactClient />;
};

export default page;
