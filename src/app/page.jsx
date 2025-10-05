'use client';

import { useState, useEffect } from 'react';
import SearchForm from '@/app/home/SearchForm';
import Features from '@/app/home/Features';
import Discount from '@/app/home/Discount';
import Slider from '@/app/home/Slider';
import WhyChooseUs from '@/app/home/WhyChooseUs';
import CouponModal from '@/components/CouponModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowModal(true);
  }, 3000); // Show modal after 3 seconds

  return () => clearTimeout(timer); // Cleanup the timer
}, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

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