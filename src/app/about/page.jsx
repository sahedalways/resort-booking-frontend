"use client";

import { useEffect, useState } from "react";
import fetchHeaderData from "../services/headerService";

const AboutUs = () => {
  const [siteTitle, setSiteTitle] = useState("BookingXpart");

  useEffect(() => {
    const fetchTitle = async () => {
      const data = await fetchHeaderData();
      setSiteTitle(data?.header_info?.site_title || "BookingXpart");
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | About Us`;
    };

    fetchTitle();
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="aboutus-header mb-5">
        <div className="aboutus-overlay"></div>
        <div className="position-relative">
          <h1 className="text-block-50 fw-bold">About Us</h1>
          <p className="text-block-20">
            Your trusted partner for hassle-free resort bookings and memorable
            vacations with <strong>{siteTitle}</strong>.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <p className="mb-4">
          <strong>{siteTitle}</strong> is a leading online platform dedicated to
          making resort and holiday bookings simple, fast, and secure. Our
          mission is to provide travelers with a seamless experience, backed by
          transparency, convenience, and reliability.
        </p>

        <p className="mb-4">
          Since our inception, we have helped thousands of travelers discover
          and book the perfect resorts—from luxurious beachfront villas to cozy
          boutique retreats. We focus on providing a curated selection of
          accommodations, ensuring that each booking meets the highest standards
          of comfort and service.
        </p>

        <p className="mb-4">
          Our platform allows users to easily search, compare, and reserve
          resorts in just a few clicks. Whether planning a family vacation,
          honeymoon, or a solo getaway, <strong>{siteTitle}</strong> provides
          all the tools you need to plan the perfect trip.
        </p>

        <h3 className="text-block-24 mb-3">Secure Payments with Bkash</h3>
        <p className="mb-4">
          To make your bookings effortless and worry-free, we use{" "}
          <strong>Bkash</strong>, Bangladesh’s leading mobile payment solution.
          With Bkash, you can pay for your resort bookings and additional
          services directly from your mobile wallet—fast, secure, and
          convenient.
        </p>

        <p className="mb-4">
          Our integration with Bkash ensures that your transactions are
          encrypted and protected at all times. You can track your payment
          history, receive instant confirmations, and enjoy peace of mind
          knowing your money is safe.
        </p>

        <p className="mb-5">
          At <strong>{siteTitle}</strong>, we are committed to providing not
          just a platform, but a complete travel experience. From discovery to
          payment, our goal is to make every vacation seamless, enjoyable, and
          unforgettable.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
