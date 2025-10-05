"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Resorts() {
  const [showFilter, setShowFilter] = useState(true);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <section className="section-gap resorts border-bottom">
      <div className="container">
        <div className="row g-4">
          {/* Left Side (Filter Section) */}
          <div className="col-lg-3 col-md-5">
            <div className="price-filter">
              <div
                className="filter-header"
                onClick={toggleFilter}
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0">Price Per Night</h5>
                <i
                  className={`bi ${
                    showFilter ? "bi-chevron-up" : "bi-chevron-down"
                  } toggle-icon`}
                ></i>
              </div>

              {showFilter && (
                <>
                  <div className="custom-budget">
                    <span>Set your own budget</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="price-options">
                    <label>
                      <input type="checkbox" /> BDT 1,049 - BDT 4,050
                    </label>
                    <label>
                      <input type="checkbox" /> BDT 4,051 - BDT 6,050
                    </label>
                    <label>
                      <input type="checkbox" /> BDT 6,051 - BDT 9,050
                    </label>
                    <label>
                      <input type="checkbox" /> BDT 9,051 - BDT 12,050
                    </label>
                    <label>
                      <input type="checkbox" /> BDT 12,051 - BDT 15,050
                    </label>
                    <label>
                      <input type="checkbox" /> BDT 15,051 - BDT 19,050
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Side (Resorts Content Section) */}
          <div className="col-lg-9 col-md-7">
            <div className="resorts-content">
              <div className="resort-card row">
                <div className="resort-image col-lg-3">
                  <Image
                    width={300}
                    height={300}
                    src="/img/resort.jpg"
                    alt="Resort 01"
                    className="img-fluid rounded"
                  />
                </div>

                <div className="resort-info col-lg-7">
                  <h5 className="resort-name mb-1">Resort 01</h5>
                  <div className="d-flex gap-4 resort-location">
                    <span>Resort - 44.34km</span>
                    <span>
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      Gazipur, Dhaka
                    </span>
                  </div>

                  <div className="resort-amenities my-3">
                    <span>
                      <i className="bi bi-wifi me-1"></i>Free Wifi
                    </span>
                    <span>
                      <i className="bi bi-badge-cc me-1"></i>Bathtub
                    </span>
                    <span>
                      <i className="bi bi-cup-straw me-1"></i>Welcome drinks
                    </span>

                    <span>
                      <i className="bi bi-water me-1"></i>Swimming pool
                    </span>
                    <span>
                      <i className="bi bi-compass me-1"></i>Travel desk
                    </span>
                    <span>
                      <Link href="#" className="more-btn">
                        + 3 more
                      </Link>
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex align-items-center gap-3">
                    <Image
                      width={24}
                      height={24}
                      src="/img/bed.png"
                      alt=""
                      className="bed-icon"
                    />
                    <div>
                      <div className="room-quality">Standard</div>
                      <span className="reservation-type">
                        Non Refundable • Room Only
                      </span>
                    </div>
                  </div>
                </div>

                <div className="resort-price text-end col-lg-2 rounded p-3">
                  <p className="start-price mb-1">Starts From</p>
                  <h5 className="price-amount fw-bold mb-1">৳1,049</h5>
                  <p className="per-night mb-2">Per Night/Room</p>
                  <Link
                    href="/resorts/2"
                    className="btn btn-primary primary-bg btn-sm rounded-pill border-0 custom-sm-btn"
                  >
                    Details <i className="bi bi-chevron-right"></i>
                  </Link>
                </div>
              </div>

              <div className="resort-card row">
                <div className="resort-image col-lg-3">
                  <Image
                    width={300}
                    height={300}
                    src="/img/resort.jpg"
                    alt="Resort 01"
                    className="img-fluid rounded"
                  />
                </div>

                <div className="resort-info col-lg-7">
                  <h5 className="resort-name mb-1">Resort 01</h5>
                  <div className="d-flex gap-4 resort-location">
                    <span>Resort - 44.34km</span>
                    <span>
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      Gazipur, Dhaka
                    </span>
                  </div>

                  <div className="resort-amenities my-3">
                    <span>
                      <i className="bi bi-wifi me-1"></i>Free Wifi
                    </span>
                    <span>
                      <i className="bi bi-badge-cc me-1"></i>Bathtub
                    </span>
                    <span>
                      <i className="bi bi-cup-straw me-1"></i>Welcome drinks
                    </span>

                    <span>
                      <i className="bi bi-water me-1"></i>Swimming pool
                    </span>
                    <span>
                      <i className="bi bi-compass me-1"></i>Travel desk
                    </span>
                    <span>
                      <Link href="#" className="more-btn">
                        + 3 more
                      </Link>
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex align-items-center gap-3">
                    <Image width={24} height={24} src="/img/bed.png" alt="" className="bed-icon" />
                    <div>
                      <div className="room-quality">Standard</div>
                      <span className="reservation-type">
                        Non Refundable • Room Only
                      </span>
                    </div>
                  </div>
                </div>

                <div className="resort-price text-end col-lg-2 rounded p-3">
                  <p className="start-price mb-1">Starts From</p>
                  <h5 className="price-amount fw-bold mb-1">৳1,049</h5>
                  <p className="per-night mb-2">Per Night/Room</p>
                  <Link
                    href="/resorts/2"
                    className="btn btn-primary primary-bg btn-sm rounded-pill border-0 custom-sm-btn"
                  >
                    Details <i className="bi bi-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}