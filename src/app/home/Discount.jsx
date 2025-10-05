import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Discount = () => {
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
              <h1>Welcome! Enjoy a 10% discount on stays</h1>
              <p>Use promo code and save up to 5%</p>
              <p>
                Booking your happiness to earn coins worth around 5%, with max
                BDT200
              </p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="discount-button has-icon">
              <button>
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