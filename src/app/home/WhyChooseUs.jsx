"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faStar,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section section-gap">
      <div className="container">
        <div className="row g-4">
          <div className="col">
            <div className="section-header-container text-center">
              <h1 className="main-title">Why Choose Us</h1>
              <p className="subtitle text-dark">
                We provide exceptional service to make your vacation perfect
              </p>
            </div>
          </div>
        </div>

        <div className="row g-5 text-start justify-content-center py-5">
          {/* Feature 1 - Trust */}
          <div className="col-lg-4 col-md-6">
            <div className="feature-item">
              <div className="feature-content">
                <div className="icon-box color-red">
                  <FontAwesomeIcon icon={faHandshake} size="2x" />
                </div>
                <h5 className="fw-bold mt-2">You Can Trust</h5>
                <p className="text-secondary">
                  With over <strong>[X]</strong> years of experience, our team of
                  travel experts has traversed the globe.
                </p>
              </div>
              <div className="feature-number">01</div>
            </div>
          </div>

          {/* Feature 2 - Tailored for You */}
          <div className="col-lg-4 col-md-6">
            <div className="feature-item mt-5">
              <div className="feature-content">
                <div className="icon-box color-blue middle-icon">
                  <FontAwesomeIcon icon={faShieldHeart} size="3x" />
                </div>
                <h5 className="fw-bold mt-2">Tailored for You</h5>
                <p className="text-secondary">
                  We believe in the power of personalized travel. Your journey
                  should reflect your unique desires and interests.
                </p>
              </div>
              <div className="feature-number">02</div>
            </div>
          </div>

          {/* Feature 3 - Safety & Quality */}
          <div className="col-lg-4 col-md-6">
            <div className="feature-item">
              <div className="feature-content">
                <div className="icon-box color-green">
                  <FontAwesomeIcon icon={faStar} size="2x" />
                </div>
                <h5 className="fw-bold mt-2">Safety and Quality</h5>
                <p className="text-secondary">
                  Your well-being is at the heart of everything we do. We adhere
                  to the highest safety and quality standards.
                </p>
              </div>
              <div className="feature-number">03</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
