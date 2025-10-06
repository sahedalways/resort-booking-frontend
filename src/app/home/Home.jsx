"use client";

import CouponModal from "@/src/components/CouponModal";
import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import Features from "./Features";
import Discount from "./Discount";
import Slider from "./Slider";
import WhyChooseUs from "./WhyChooseUs";

export default function Home({ homeData }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenCoupons = sessionStorage.getItem("hasSeenCoupons");

    if (!hasSeenCoupons && homeData?.coupons?.length > 0) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem("hasSeenCoupons", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [homeData]);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {showModal && homeData?.coupons && (
        <CouponModal onClose={handleCloseModal} couponData={homeData.coupons} />
      )}

      <div
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${
            homeData?.site_info?.hero_image_url || "/img/default-hero.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <SearchForm resortData={homeData?.resort_info} />
        </div>
      </div>

      <Features featuresData={homeData?.feature_images} />
      {homeData?.coupons && <Discount couponData={homeData?.coupons} />}

      <Slider resortData={homeData?.resort_info} />
      <WhyChooseUs />
    </>
  );
}
