"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";
import Features from "./Features";
import Discount from "./Discount";
import Slider from "./Slider";
import WhyChooseUs from "./WhyChooseUs";
import CouponModal from "@/src/components/CouponModal";

export default function Home({ homeData }) {
  const [showModal, setShowModal] = useState(false);

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
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <SearchForm resortData={homeData?.resort_info} />
        </div>
      </div>

      <Features featuresData={homeData?.feature_images} />
      {homeData?.coupons && (
        <Discount
          couponData={homeData?.coupons}
          onClaim={() => setShowModal(true)}
        />
      )}

      <Slider resortData={homeData?.resort_info} />
      <WhyChooseUs />
    </>
  );
}
