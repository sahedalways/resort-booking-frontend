"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageSliderModal({
  images = [],
  isOpen,
  onClose,
  initialIndex = 0,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  // Navigate images
  const prevImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFade(true);
    }, 150);
  };

  const nextImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 150);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>

        {/* Image Slider */}
        <div className="slider-container">
          <button className="nav-btn prev" onClick={prevImage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 18l-6-6 6-6"
              />
            </svg>
          </button>

          <div className={`image-wrapper ${fade ? "fade-in" : "fade-out"}`}>
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              fill
              className="slider-image rounded-3"
              sizes="(max-width: 900px) 90vw, 900px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <button className="nav-btn next" onClick={nextImage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6l6 6-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <p className="image-count">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      <style jsx>{`

        /* Overlay background */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(6px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
          animation: fadeIn 0.3s ease-in-out;
        }

        /* Modal container */
        .modal-content {
          position: relative;
          max-width: 900px;
          width: 90%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Close button */
        .close-btn {
          position: absolute;
          top: 15px;
          right: 25px;
          font-size: 2rem;
          color: #fff;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        /* Slider controls */
        .slider-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .nav-btn {
          font-size: 2.2rem;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #fff;
          cursor: pointer;
          width: 50px;
          min-width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 0 15px;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        /* Image container with fixed aspect */
        .image-wrapper {
          position: relative;
          width: 800px;
          height: 500px;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.6);
          transition: opacity 0.3s ease-in-out;
        }

        .fade-in {
          opacity: 1;
        }
        .fade-out {
          opacity: 0;
        }

        /* Image style */
        .slider-image {
          object-fit: contain;
        }

        /* Counter */
        .image-count {
          color: #fff;
          margin-top: 15px;
          font-size: 1rem;
          letter-spacing: 1px;
          background: rgba(0, 0, 0, 0.4);
          padding: 6px 12px;
          border-radius: 8px;
        }

        /* Fade animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .image-wrapper {
            width: 90vw;
            height: 55vh;
          }
          .nav-btn {
            width: 40px;
            height: 40px;
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}
