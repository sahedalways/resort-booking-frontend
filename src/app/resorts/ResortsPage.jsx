"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@/src/components/Skeleton";
import fetchResortData from "../services/resortService";
import ResortFacilities from "@/src/components/ResortFacilities";

export default function ResortsPage({ resortData: initialData }) {
  const [resortData, setResortData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(
    initialData.pagination.current_page
  );
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(true);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > resortData.pagination.last_page) return;

    setLoading(true);
    try {
      const newData = await fetchResortData(page);
      setResortData(newData);
      setCurrentPage(page);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!resortData || loading) return <Skeleton type="resorts" />;

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
              {resortData.resort_info.map((resort) => (
                <div key={resort.id} className="resort-card row mb-4">
                  <div className="resort-image col-lg-3">
                    <Image
                      width={300}
                      height={300}
                      src={resort.images?.[0] || "/img/resort.jpg"}
                      alt={resort.name}
                      className="img-fluid rounded"
                    />
                  </div>

                  <div className="resort-info col-lg-7">
                    <h5 className="resort-name mb-1">{resort.name}</h5>
                    <div className="d-flex gap-4 resort-location">
                      <span>Resort - {resort.distance} km</span>
                      <span>
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {resort.location}
                      </span>
                    </div>

                    <div className="resort-amenities my-3">
                      <ResortFacilities facilities={resort.facilities} />
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
                        <div className="room-quality">
                          {resort.package_type?.type_name}
                        </div>
                        <span className="reservation-type">
                          {resort.package_type?.is_refundable
                            ? "Refundable"
                            : "Non Refundable"}{" "}
                          • Room Only
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="resort-price text-end col-lg-2 rounded p-3">
                    <p className="start-price mb-1">Starts From</p>
                    <h5 className="price-amount fw-bold mb-1">
                      ৳{resort.lowest_price || "N/A"}
                    </h5>
                    <p className="per-night mb-2">Per Night/Room</p>
                    <Link
                      href={`/resorts/${resort.id}`}
                      className="btn btn-primary primary-bg btn-sm rounded-pill border-0 custom-sm-btn"
                    >
                      Details <i className="bi bi-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <nav aria-label="Resort pagination" className="mt-4">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from(
                    { length: resortData.pagination.last_page },
                    (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    )
                  )}

                  <li
                    className={`page-item ${
                      currentPage === resortData.pagination.last_page
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
