import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";
import Toast from "../../components/Toast";

const Discount = ({ couponData }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const copyCode = (code) => {
    try {
      navigator.clipboard.writeText(code);
      setToastMessage(`Copied: ${code}`);
      setToastType("success");
    } catch (error) {
      setToastMessage("Failed to copy!");
      setToastType("error");
    }
  };

  if (!couponData || couponData.length === 0) return null;

  // Randomly select one coupon
  const randomIndex = Math.floor(Math.random() * couponData.length);
  const coupon = couponData[randomIndex];

  return (
    <section className="discount-section section-gap">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-2 text-lg-start text-center">
            <Image
              src="/img/discount.png"
              alt="Discount"
              className="img-fluid discount-png"
              width={40}
              height={40}
            />
          </div>

          <div className="col-lg-7">
            <div className="discount-text">
              <h1>
                Welcome! Enjoy a {coupon.discount_value}% discount on stays
              </h1>
              <p>Use promo code and save {coupon.discount_value}%</p>
              <p>
                Booking your happiness to earn coins worth around{" "}
                {coupon.discount_value}%
              </p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="discount-button has-icon">
              <button onClick={() => copyCode(coupon.code)}>
                Claim Discount
                <span className="ms-2">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />
    </section>
  );
};

export default Discount;
