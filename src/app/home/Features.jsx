import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const Features = () => {
  return (
    <section className="features-section section-gap">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="section-header-container">
              <div className="feature-pill">
                <span>Our Features</span>
              </div>

              <h1 className="main-title">Choose Your Priority</h1>

              <p className="subtitle">
                Our services are designed to cater to your specific needs and
                goals
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="card custom-overlay-card position-relative">
              <Image
                src="/img/resort_img.png"
                alt=""
                className="card-img-top card-img-top-fit w-100 h-auto"
                width={600}
                height={400}
              />

              <div className="custom-overlay">
                <div className="overlay-content">
                  <h2 className="mb-2">Resort</h2>

                  <div className="rating-container">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card custom-overlay-card position-relative">
              <Image
                src="/img/resort_img.png"
                alt=""
                className="card-img-top card-img-top-fit w-100 h-auto"
                width={600}
                height={400}
              />

              <div className="custom-overlay">
                <div className="overlay-content">
                  <h2 className="mb-2">Resort</h2>

                  <div className="rating-container">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;