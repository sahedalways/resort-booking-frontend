"use client";

import { useEffect } from "react";
import fetchHeaderData from "../../services/headerService";
import CheckoutClient from "./CheckoutClient";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store/store";

const CheckoutPage = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const data = await fetchHeaderData();
      document.title = `${
        data?.header_info?.site_title || "BookingXpert"
      } | Checkout`;
    };

    fetchTitle();
  }, []);

  return (
    <Provider store={store}>
      <CheckoutClient />
    </Provider>
  );
};

export default CheckoutPage;
