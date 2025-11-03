import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

const Discount = ({ couponData, onClaim }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  if (!couponData || couponData.length === 0) return null;

  // Randomly select one coupon
  const randomIndex = Math.floor(Math.random() * couponData.length);
  const coupon = couponData[randomIndex];

  useEffect(() => {
    if (toastMessage) {
      switch (toastType) {
        case "success":
          toast.success(toastMessage, { autoClose: 3000, theme: "colored" });
          break;
        case "error":
          toast.error(toastMessage, { autoClose: 3000, theme: "colored" });
          break;
        case "warning":
          toast.warn(toastMessage, { autoClose: 3000, theme: "colored" });
          break;
        default:
          toast.info(toastMessage, { autoClose: 3000, theme: "colored" });
      }

      setToastMessage(""); // reset the message
    }
  }, [toastMessage, toastType]);

  return (
    <section className="discount-section section-gap-sm">
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
              <button onClick={onClaim}>
                Claim Discount
                <span className="ms-2">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;
