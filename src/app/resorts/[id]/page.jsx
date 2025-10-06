"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faWifi,
  faConciergeBell,
  faLanguage,
  faBed,
  faUtensils,
  faHeartbeat,
  faBriefcase,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";

const ResortDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="resort-details">
      <div className="breadcrumb-container">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb custom-breadcrumb">
              <li className="breadcrumb-item">
                <Link href="#">Resorts</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Bangladesh</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Gazipur</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Resort 01
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="resort-info">
                <h1 className="resort-title text-block-24 mb-3">Resort 01</h1>
                <div className="details-container">
                  <span className="detail-item paragraph-sm">
                    <span className="icon">🚗</span>
                    44.49 km from city center
                  </span>
                  <span className="separator">
                    <i className="bi bi-dot"></i>
                  </span>
                  <span className="detail-item paragraph-sm">
                    <span className="icon">📍</span>
                    Plot #09, Block #D, Road 112, Gazipur, Dhaka
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="gallery-container">
                <div className="main-photo">
                  <Image
                    width={800}
                    height={400}
                    src="/img/resort_img.png"
                    alt=""
                  />
                </div>

                <div className="side-photos">
                  <div className="side-photo-item">
                    <Image
                      width={800}
                      height={400}
                      src="/img/resort_img.png"
                      alt=""
                    />
                  </div>

                  <div className="side-photo-item">
                    <Image
                      width={800}
                      height={400}
                      src="/img/resort_img.png"
                      alt=""
                    />
                  </div>

                  <div className="side-photo-item">
                    <Image
                      width={800}
                      height={400}
                      src="/img/resort_img.png"
                      alt=""
                    />
                  </div>

                  <div className="side-photo-item">
                    <Image
                      width={800}
                      height={400}
                      src="/img/resort_img.png"
                      alt=""
                    />
                    <div className="overlay">Show all 15 photos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="description-text">
                <h2 className="text-block-20 primary-color mb-3">
                  Description
                </h2>
                <p className="paragraph-md">
                  Set in Cox&apos;s Bazar, 400 metres from Cox&apos;s Bazar Sea
                  Beach, **Hotel Auster echo** offers accommodation with a
                  restaurant and free private parking. The accommodation
                  provides a 24-hour front desk as well as free WiFi
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d117763.29359353302!2d89.06570155!3d22.7244155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1759204497675!5m2!1sen!2sbd"
                  width="400"
                  height="200"
                  loading="lazy"
                  //referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h3 className="text-block-20 primary-color mb-3">
                Highlighted Facilities
              </h3>
              <div className="facilities-grid">
                <div className="facility-item">
                  <span className="wifi-icon">
                    <i className="bi bi-wifi"></i>
                  </span>{" "}
                  Free Wi-Fi
                </div>
                <div className="facility-item">
                  <span className="wifi-icon">
                    <i className="bi bi-wifi"></i>
                  </span>{" "}
                  Free Wi-Fi
                </div>
                <div className="facility-item">
                  <span className="wifi-icon">
                    <i className="bi bi-wifi"></i>
                  </span>{" "}
                  Free Wi-Fi
                </div>
                <div className="facility-item">
                  <span className="wifi-icon">
                    <i className="bi bi-wifi"></i>
                  </span>{" "}
                  Free Wi-Fi
                </div>
                <div className="facility-item">
                  <span className="wifi-icon">
                    <i className="bi bi-wifi"></i>
                  </span>{" "}
                  Free Wi-Fi
                </div>
                <div className="facility-item">
                  <span className="wifi-icon">
                    <i className="bi bi-wifi"></i>
                  </span>{" "}
                  Free Wi-Fi
                </div>
                <div className="facility-item">
                  <span className="wifi-icon">
                    <i className="bi bi-wifi"></i>
                  </span>{" "}
                  Free Wi-Fi
                </div>
                <div className="facility-item">
                  <span className="wifi-icon">
                    <i className="bi bi-wifi"></i>
                  </span>{" "}
                  Free Wi-Fi
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="text-block-20 primary-color mb-3">
                Resort Policy
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h5 className="text-block-20 primary-color mb-3">Night Stay</h5>
              <div className="row gx-3">
                <div className="col-6">
                  <div className="custom-time-box">
                    <Image
                      width={30}
                      height={30}
                      src="/img/door.png"
                      alt=""
                      className="time-box-img"
                    />
                    <div>
                      <span className="icon-text">Check-in</span>
                      <div className="time-text">02:00PM</div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="custom-time-box">
                    <Image
                      width={30}
                      height={30}
                      src="/img/door.png"
                      alt=""
                      className="time-box-img"
                    />
                    <div>
                      <span className="icon-text">Check-in</span>
                      <div className="time-text">02:00PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <h5 className="text-block-20 primary-color mb-3">Day Long</h5>
              <div className="row gx-3">
                <div className="col-6">
                  <div className="custom-time-box">
                    <Image
                      width={30}
                      height={30}
                      src="/img/door.png"
                      alt=""
                      className="time-box-img"
                    />
                    <div>
                      <span className="icon-text">Check-in</span>
                      <div className="time-text">02:00PM</div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="custom-time-box">
                    <Image
                      width={30}
                      height={30}
                      src="/img/door.png"
                      alt=""
                      className="time-box-img"
                    />
                    <div>
                      <span className="icon-text">Check-in</span>
                      <div className="time-text">02:00PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* custom tab section */}
      <section className="overflow-hidden">
        <div className="row">
          <div className="col">
            <div className="custom-tab-header">
              <div className="container">
                <nav className="nav-container">
                  <Link
                    href="#"
                    className={`nav-link ${
                      activeTab === "overview" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("overview");
                    }}
                  >
                    Overview
                  </Link>
                  <Link
                    href="#"
                    className={`nav-link ${
                      activeTab === "rooms" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("rooms");
                    }}
                  >
                    Rooms
                  </Link>
                  <Link
                    href="#"
                    className={`nav-link ${
                      activeTab === "amenities" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("amenities");
                    }}
                  >
                    Amenities
                  </Link>
                  <Link
                    href="#"
                    className={`nav-link ${
                      activeTab === "location" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("location");
                    }}
                  >
                    Location
                  </Link>
                  <Link
                    href="#"
                    className={`nav-link ${
                      activeTab === "policies" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("policies");
                    }}
                  >
                    Policies
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Dynamic Content */}
              <div>
                {activeTab === "overview" && (
                  <div className="overview-content">
                    <div className="row">
                      <div className="col-xl-4 col-lg-5">
                        <div className="card shadow border-0 overflow-hidden">
                          <div className="p-3">
                            <div className="main-img w-100 overflow-hidden rounded-3 mb-2">
                              <Image
                                width={300}
                                height={300}
                                src="/img/bed-2.png"
                                alt=""
                                className="w-100 h-100 object-fit-cover"
                              />
                            </div>

                            <div className="row g-2">
                              <div className="col-6">
                                <div className="thumb-img overflow-hidden rounded-3">
                                  <Image
                                    width={300}
                                    height={300}
                                    src="/img/living-room.png"
                                    alt="Side view of the room"
                                    className="w-100 h-100 object-fit-cover"
                                  />
                                </div>
                              </div>

                              <div className="col-6">
                                <div className="thumb-img overflow-hidden rounded-3">
                                  <Image
                                    width={300}
                                    height={300}
                                    src="/img/bathroom.png"
                                    alt="View of the attached bathroom"
                                    className="w-100 h-100 object-fit-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-baseline mb-4">
                              <h2 className="text-block-20 mb-0">
                                Room Specifications
                              </h2>
                              <Link
                                href="#"
                                className="primary-color text-block-14-fw-md text-decoration-none"
                              >
                                View Image
                              </Link>
                            </div>

                            <div className="text-secondary">
                              <div className="spec-item mb-2">
                                <span className="text-block-14-fw-md gray-text">
                                  Bed Type
                                </span>
                                <span className="text-muted">:</span>
                                <span className="text-block-14-fw-md gray-text">
                                  DOUBLE x 1
                                </span>
                              </div>

                              <div className="spec-item mb-2">
                                <span className="text-block-14-fw-md gray-text">
                                  Capacity
                                </span>
                                <span className="text-muted">:</span>
                                <span className="text-block-14-fw-md gray-text">
                                  Adult x 2, Child x 2
                                </span>
                              </div>

                              <div className="spec-item mb-2">
                                <span className="text-block-14-fw-md gray-text">
                                  View Type
                                </span>
                                <span className="text-muted">:</span>
                                <span className="text-block-14-fw-md gray-text">
                                  hill-view
                                </span>
                              </div>

                              <div className="spec-item mb-2">
                                <span className="text-block-14-fw-md gray-text">
                                  Area
                                </span>
                                <span className="text-muted">:</span>
                                <span className="text-block-14-fw-md gray-text">
                                  23 sqm
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-7">
                        <div className="p-3">
                          <h1 className="text-block-24 text-dark mb-3">
                            Couple Room Non AC (Hill View)
                          </h1>

                          <div
                            className="d-flex flex-wrap gap-2 mb-4"
                            id="amenity-chips-container"
                          >
                            <div className="px-3 py-1 amenity-chip text-sm rounded-3 fw-medium">
                              <Image
                                width={18}
                                height={18}
                                src="/img/noSmoking.png"
                                alt=""
                              />
                              Non-smoking rooms
                            </div>

                            <div className="px-3 py-1 amenity-chip text-sm rounded-3 fw-medium">
                              <Image
                                width={18}
                                height={18}
                                src="/img/room_service.png"
                                alt=""
                              />
                              Room service
                            </div>

                            <div className="px-3 py-1 amenity-chip text-sm rounded-3 fw-medium">
                              <Image
                                width={18}
                                height={18}
                                src="/img/slipper.png"
                                alt=""
                              />
                              Slippers
                            </div>

                            <div className="px-3 py-1 amenity-chip text-sm rounded-3 fw-medium">
                              <Image
                                width={18}
                                height={18}
                                src="/img/Toiletries.png"
                                alt=""
                              />
                              Toiletries
                            </div>

                            <div className="px-3 py-1 amenity-chip text-sm rounded-3 fw-medium">
                              <Image
                                width={18}
                                height={18}
                                src="/img/Shower.png"
                                alt=""
                              />
                              Shower
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-xl-6 col-lg-8">
                              <div className="bg-white rounded-3 shadow p-4 border border-light-subtle">
                                <div className="mb-4">
                                  <h2 className="text-block-20 mb-2">
                                    Option 01
                                  </h2>
                                  <p className="text-block-18-fw-light  d-inline-block me-2 mb-0">
                                    <span className="secondary-color">
                                      BDT 1,190{" "}
                                    </span>{" "}
                                    per night/room
                                  </p>

                                  <p className="text-block-14-fw-md gray-text mt-1">
                                    + taxes and fees apply
                                  </p>
                                </div>

                                <hr className="my-4" />

                                <ul className="list-unstyled space-y-3 mb-4">
                                  <li className="d-flex align-items-start text-dark mb-3">
                                    <span className="icon-size text-success me-3 mt-1">
                                      <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className="text-block-18-fw-md gray-text">
                                      Room Only
                                    </span>
                                  </li>

                                  <li className="d-flex align-items-start text-dark mb-3">
                                    <span className="icon-size text-success me-3 mt-1">
                                      <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className="text-block-18-fw-md gray-text">
                                      Non-Smoking Room
                                    </span>
                                  </li>

                                  <li className="d-flex align-items-start text-dark mb-3">
                                    <span className="icon-size text-danger me-3 mt-1">
                                      <FontAwesomeIcon icon={faXmark} />
                                    </span>
                                    <span className="text-block-18-fw-md gray-text">
                                      Free cancellation not available
                                    </span>
                                  </li>
                                </ul>

                                <p className="text-block-18-fw-md gray-text mb-3 pt-2">
                                  For 1 Room, 2 Night
                                </p>

                                <button className="w-100 btn btn primary-bg custom-btn-style fw-bold rounded-3 shadow-sm">
                                  Book Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "rooms" && (
                  <div className="overview-content p-4">
                    <h3 className="text-block-20 primary-color mb-3">
                      Rooms content
                    </h3>
                    <p>Details about different rooms.</p>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div className="overview-content p-4">
                    <h3 className="text-block-20 primary-color mb-3">
                      Amenities content
                    </h3>
                    <p>Swimming pool, WiFi, parking, etc.</p>
                  </div>
                )}

                {activeTab === "location" && (
                  <div className="overview-content p-4">
                    <h3 className="text-block-20 primary-color mb-3">
                      Location content
                    </h3>
                    <p>Map, nearby places, and transport info.</p>
                  </div>
                )}

                {activeTab === "policies" && (
                  <div className="overview-content p-4">
                    <h3 className="text-block-20 primary-color mb-3">
                      Policies content
                    </h3>
                    <p>Check-in/check-out times, cancellation policy, etc.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* hotel and room facilities */}
      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="text-block-20 primary-color mb-3">
                hotel and room facilities
              </h3>
            </div>
          </div>

          <div className="row">
            {/* Internet */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card feature-card">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon icon={faWifi} className="feature-icon" />
                  <span className="feature-title ms-2">Internet</span>
                </div>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Free Wi-Fi
                  </li>
                </ul>
              </div>
            </div>

            {/* Services */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card feature-card">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon
                    icon={faConciergeBell}
                    className="feature-icon"
                  />
                  <span className="feature-title ms-2">Services</span>
                </div>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Air conditioning
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Reception desk
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    24-hour reception
                  </li>
                </ul>
              </div>
            </div>

            {/* Languages */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card feature-card">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon icon={faLanguage} className="feature-icon" />
                  <span className="feature-title ms-2">Languages Spoken</span>
                </div>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    English
                  </li>
                </ul>
              </div>
            </div>

            {/* Rooms */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card feature-card">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon icon={faBed} className="feature-icon" />
                  <span className="feature-title ms-2">Rooms</span>
                </div>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Room service
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    TV
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Wardrobe/Closet
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Slippers
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Toiletries
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Shower
                  </li>
                </ul>
              </div>
            </div>

            {/* Meals */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card feature-card">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon icon={faUtensils} className="feature-icon" />
                  <span className="feature-title ms-2">Meals</span>
                </div>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Coffee/tea for guests
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Breakfast
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Restaurant
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Breakfast/lunch to go
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Bottled water
                  </li>
                </ul>
              </div>
            </div>

            {/* Health */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card feature-card">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon
                    icon={faHeartbeat}
                    className="feature-icon"
                  />
                  <span className="feature-title ms-2">
                    Health and Safety Measures
                  </span>
                </div>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Temperature control for guests
                  </li>
                </ul>
              </div>
            </div>

            {/* Business */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card feature-card">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="feature-icon"
                  />
                  <span className="feature-title ms-2">Business</span>
                </div>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Event facilities
                  </li>
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Conference Hall
                  </li>
                </ul>
              </div>
            </div>

            {/* Pets */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card feature-card">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon icon={faPaw} className="feature-icon" />
                  <span className="feature-title ms-2">Pets</span>
                </div>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center feature-item">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon me-2"
                    />{" "}
                    Pets Not Allowed
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ###hotel and room facilities */}

      {/* full width map */}
      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d117763.29359353302!2d89.06570155!3d22.7244155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1759204497675!5m2!1sen!2sbd"
                width="400"
                height="400"
                loading="lazy"
                //referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* ###full width map */}

      {/* note section */}
      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-block-20 primary-color mb-3">
                Important - Please Note:
              </h3>
            </div>

            <div className="col-12">
              <div className="">
                <div className="table-responsive shadow-sm">
                  <table className="table mb-0 table-bordered custom-table-style">
                    <tbody>
                      <tr>
                        <td className="fw-semibold bg-light text-dark col-lg-3 col-md-4 col-6 p-3">
                          <i className="bi bi-box-arrow-in-right me-2"></i>{" "}
                          Check-in
                        </td>
                        <td className="col-lg-9 col-md-8 col-6 p-3 gray-text">
                          12:00 PM
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold bg-light text-dark p-3">
                          <i className="bi bi-box-arrow-left me-2"></i>{" "}
                          Check-out
                        </td>
                        <td className="p-3 gray-text">11:59 PM</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold bg-light text-dark align-top p-3">
                          <i className="bi bi-info-circle me-2"></i> Additional
                          Facts:
                        </td>
                        <td className="p-3">
                          <ul className="mb-0 ps-3 gray-text d-grid gap-2">
                            <li>
                              The number of restaurant(s) in the hotel is 1.
                            </li>
                            <li>Check in from: 12:00 PM</li>
                            <li>Check Out until: 11:59 AM</li>
                            <li>Reception Open Until: 11:59 PM</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold bg-light text-dark align-top p-3">
                          <i className="bi bi-credit-card me-2"></i> Payment
                          accepted by the property
                        </td>
                        <td className="p-3">
                          <Image
                            width={80}
                            height={40}
                            src="/img/bkash.png"
                            alt="Bkash"
                            className="payment-icon-table w-auto m-1"
                          />
                          <Image
                            width={80}
                            height={40}
                            src="/img/nagad.png"
                            alt="Nagad"
                            className="payment-icon-table w-auto m-1"
                          />
                          <Image
                            width={80}
                            height={40}
                            src="/img/rocket.png"
                            alt="Rocket"
                            className="payment-icon-table w-auto m-1"
                          />
                          <Image
                            width={80}
                            height={40}
                            src="/img/Upay.png"
                            alt="Upai"
                            className="payment-icon-table w-auto"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ###note section */}
    </div>
  );
};

export default ResortDetailsPage;
