"use client";

import { useEffect } from "react";
import ContactClient from "./ContactClient";
import { useSiteData } from "../hooks/SiteDataContext";

const page = () => {
  const { headerData } = useSiteData();

  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  useEffect(() => {
    document.title = `${siteTitle} | Contact Us`;
  }, [siteTitle]);

  return <ContactClient />;
};

export default page;
