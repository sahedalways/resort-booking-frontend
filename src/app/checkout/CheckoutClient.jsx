"use client";

import React from "react";
import Image from "next/image";

const CheckoutClient = () => {
  return (
    <section className="section-gap">
      <div className="container my-5">
        <div className="text-center mb-4">
          <i className="fas fa-shopping-cart cart-icon mb-3 mx-auto"></i>
          <h1 className="cart-title">Your Cart!</h1>
        </div>

        <div className="row">
          <div className="col-lg-9">
            <div className="card cart-item-card mb-4">
              <div className="card-body">
                <div className="row g-0 align-items-center">
                  <div className="col-md-9">
                    <div className="row g-4">
                      <div className="col-md-4">
                        <Image
                          width={500}
                          height={500}
                          className="img-fluid object-fit-cover cart-side-img"
                          src={"/img/bathroom.png"}
                        />
                      </div>
                      <div className="col-md-8">
                        <h5 className="room-title-checkout">
                          Twin Room Twin Bed VIP Suite
                        </h5>
                        <p className="price-per-night">
                          <span className="currency">৳</span> 10,000.00/Night
                        </p>

                        <div className="d-flex align-items-center mb-3">
                          <div className="border d-flex me-2 rounded-1">
                            <label htmlFor="nightStay" className="item-label">
                              Night Stay No
                            </label>
                            <input
                              type="number"
                              id="nightStay"
                              className="form-control item-input shadow-none bg-white"
                              defaultValue="4"
                            />
                          </div>
                          <button className="btn btn-update rounded-1">
                            Update
                          </button>
                        </div>

                        <div className="d-flex align-items-center mb-2">
                          <div className="border d-flex me-2 rounded-2">
                            <label
                              htmlFor="guestNo"
                              className="me-2 item-label"
                            >
                              Guest No
                            </label>
                            <input
                              type="number"
                              id="guestNo"
                              className="form-control item-input shadow-none"
                              defaultValue="1"
                            />
                          </div>
                          <button className="btn btn-update rounded-1">
                            Update
                          </button>
                        </div>

                        <p className="max-persons mt-3">
                          Maximum 4 Person(s) can stay in this Room.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 text-end d-flex flex-column justify-content-between align-items-end h-100">
                    <div className="price-total mb-2">
                      <span className="currency">৳</span> 50,000.00
                    </div>
                    <i className="fas fa-times close-icon"></i>
                    <div className="selected-night">[5 night]</div>
                    <div className="date-range mt-3 text-start">
                      <div className="date-item">
                        <span className="date-text">Sep 30, 2025</span>
                      </div>
                      <i className="fas fa-arrow-right date-arrow"></i>
                      <div className="date-item">
                        <span className="date-text">Oct 5, 2025</span>
                      </div>
                    </div>
                    <div className="date-range mt-3 text-start">
                      <div className="date-item">
                        <span className="date-text">Sep 30, 2025</span>
                      </div>
                      <i className="fas fa-arrow-right date-arrow"></i>
                      <div className="date-item">
                        <span className="date-text">Oct 5, 2025</span>
                      </div>
                    </div>
                    <button className="btn-update-date mt-3 mx-auto">
                      Update Date
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-5">
              <button className="btn btn-action-add me-3">
                <i className="fas fa-plus"></i> Add More Room
              </button>
              <button className="btn btn-action-proceed">
                <i className="fas fa-arrow-right"></i> Proceed Booking
              </button>
            </div>

            <h4 className="looking-for-title text-center mb-3">
              You might be looking for
            </h4>
            <div className="text-center mb-5">
              <button className="btn btn-secondary-action me-3 btn-action-blue">
                <i className="fas fa-arrow-left"></i> Back to Previous Hotel
              </button>
              <button className="btn btn-secondary-action me-3 btn-action-green">
                <i className="fas fa-search"></i> Previous Search Result
              </button>
              <button className="btn btn-secondary-action me-3 btn-action-yellow">
                <i className="fas fa-calendar-alt"></i> Change Search Date
              </button>
              <button className="btn btn-secondary-action btn-action-red">
                <i className="fas fa-times-circle"></i> Clear Cart
              </button>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="booking-details-card">
              <h5 className="details-title p-3">Booking Details</h5>

              <div className="p-3">
                <div className="booking-for mb-3">
                  <h6 className="booking-details-title">Booking For 5 Night</h6>
                  <div className="date-info">
                    <span>Sep 30, 2025 </span>
                    <i className="fas fa-arrow-right"></i>
                    <span>Oct 5, 2025</span>
                  </div>
                  <div className="date-info">
                    <span>tue </span>

                    <span>fri</span>
                  </div>

                </div>

                <div className="total-guest mb-3 d-flex gap-2 align-items-center">
               
                  <h6 className="booking-details-title mb-0">Total Guest</h6>
                  <i className="fas fa-arrow-right"></i>
                  <p className="mb-0 guest-count">
                    1 <i className="fas fa-user"></i>
                  </p>
                </div>

                <hr />

                <div className="room-summary mb-4">
                  <h6 className="booking-details-title">Room # 1 / of 1</h6>
                  <p className="room-name-detail mb-2">
                    Twin Room Twin Bed VIP Suite
                  </p>
                  <p className="room-details-text mb-0">5 Night</p>
                  <p className="room-details-text mb-0">
                    Sep 30, 2025 - Oct 5, 2025
                  </p>
                  <p className="room-details-text">1 Guest</p>
                </div>

                <h6 className="booking-details-title">Bill Summary</h6>
                <div className="bill-summary">
                  <div className="bill-item d-flex justify-content-between">
                    <span>Room Bill:</span>
                    <span className="value"></span>
                  </div>
                  <div className="bill-item detail-text d-flex justify-content-between border-bottom pb-3 mb-3">
                    <span>5 Night</span>
                    <span className="currency"></span> ৳50,000.00
                  </div>

                  <div className="bill-item d-flex justify-content-between">
                    <span>Room Bill:</span>
                    <span className="value"></span>
                  </div>
                  <div className="bill-item detail-text d-flex justify-content-between border-bottom pb-3 mb-3">
                    <span>5 Night</span>
                    <span className="currency"></span> ৳50,000.00
                  </div>

                  <div className="bill-item d-flex justify-content-between">
                    <span>Room Bill:</span>
                    <span className="value"></span>
                  </div>
                  <div className="bill-item detail-text d-flex justify-content-between border-bottom pb-3 mb-3">
                    <span>5 Night</span>
                    <span className="currency"></span> ৳50,000.00
                  </div>

                  <div className="bill-item d-flex justify-content-between">
                    <span>Room Bill:</span>
                    <span className="value"></span>
                  </div>
                  <div className="bill-item detail-text d-flex justify-content-between border-bottom pb-3 mb-3">
                    <span>5 Night</span>
                    <span className="currency"></span> ৳50,000.00
                  </div>
                </div>

             
              </div>
                <div className="grand-total d-flex justify-content-between align-items-center p-3">
                  <span className="total-label">Grand Total:</span>
                  <span className="total-value">
                    <span className="currency">৳</span> 50,000.00
                  </span>
                </div>
            </div>
            <div className="text-center mt-4">
                  <button className="btn btn-custom">
                    <i className="fas fa-book-open"></i> Book Now
                  </button>
                </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CheckoutClient;
