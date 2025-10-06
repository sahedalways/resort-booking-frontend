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
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {showModal && <CouponModal onClose={handleCloseModal} />}

      <div className="hero-section">
        <div className="container">
          <SearchForm />
        </div>
      </div>
      <Features />
      <Discount />
      <Slider />
      <WhyChooseUs />
    </>
  );
}
