"use client";

import { useEffect } from "react";
import CartClient from "./CartClient";
import fetchHeaderData from "../../services/headerService";

const cartPage = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await fetchHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpert"
      } | Cart`;
    };

    fetchTitle();
  }, []);

  return <CartClient />;
};

export default cartPage;
