"use client";

import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import Features from "./Features";
import Discount from "./Discount";
import Slider from "./Slider";
import WhyChooseUs from "./WhyChooseUs";
import CouponModal from "@/components/CouponModal";

export default function Home({ homeData }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {showModal && <CouponModal onClose={handleCloseModal} />}
      <div>{homeData.feature_images}</div>
      <div className="hero-section">
        <div className="container">
          <SearchForm heroData={homeData.site_info} />
        </div>
      </div>
      <Features featureData={homeData.feature_images} />
      <Discount coupons={homeData.coupons} />
      <Slider resorts={homeData.resort_info} />
      <WhyChooseUs />
    </>
  );
}
