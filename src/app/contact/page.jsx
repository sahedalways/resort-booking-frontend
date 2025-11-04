"use client";

import { useContext, useEffect } from "react";
import ContactClient from "./ContactClient";
import { HeaderContext } from "../hooks/api/HeaderContext";

const page = () => {
  const { headerData } = useContext(HeaderContext);

  const siteTitle = headerData?.header_info?.site_title || "BookingXpert";

  useEffect(() => {
    document.title = `${siteTitle} | Contact Us`;
  }, [siteTitle]);

  return <ContactClient />;
};

export default page;
