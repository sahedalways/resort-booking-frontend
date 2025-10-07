"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@/src/components/Skeleton";
import fetchResortData from "../services/resortService";
import ResortFacilities from "@/src/components/ResortFacilities";
import ResortFilter from "@/src/components/ResortFilter";

export default function ResortsPage({ resortData: initialData }) {
  const [resortData, setResortData] = useState(initialData);
  const [filteredResorts, setFilteredResorts] = useState(
    initialData.resort_info
  );
  const [currentPage, setCurrentPage] = useState(
    initialData.pagination.current_page
  );
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page) => {
    if (page < 1 || page > resortData.pagination.last_page) return;
    setLoading(true);
    try {
      const newData = await fetchResortData(page);
      setResortData(newData);
      setFilteredResorts(newData.resort_info);
      setCurrentPage(page);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle filter change
  const handleFilterChange = (selectedRanges) => {
    if (selectedRanges.length === 0) {
      setFilteredResorts(resortData.resort_info);
      return;
    }

    const filtered = resortData.resort_info.filter((resort) => {
      const price = resort.lowest_price || 0;
      return selectedRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return price >= min && price <= max;
      });
    });

    setFilteredResorts(filtered);
  };

  if (!resortData || loading) return <Skeleton type="resorts" />;

  return (
    <section className="section-gap resorts border-bottom">
      <div className="container">
        <div className="row g-4">
          {/* Left Side (Filter Section) */}
          <ResortFilter onFilterChange={handleFilterChange} />

          {/* Right Side (Resorts Content Section) */}
          <div className="col-lg-9 col-md-7">
            <div className="resorts-content">
              {filteredResorts && filteredResorts.length > 0 ? (
                <>
                  {filteredResorts.map((resort) => (
                    <div key={resort.id} className="resort-card row mb-4">
                      {/* Resort Image */}
                      <div className="resort-image col-lg-3">
                        <Image
                          width={300}
                          height={300}
                          src={resort.images?.[0] || "/img/resort.jpg"}
                          alt={resort.name}
                          className="img-fluid rounded"
                        />
                      </div>

                      {/* Resort Info */}
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
                          {resort.package_type?.icon && (
                            <i
                              className={`${resort.package_type.icon} fa-lg text-primary`}
                            ></i>
                          )}
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

                      {/* Resort Price Section */}
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
                  {resortData?.pagination && (
                    <nav aria-label="Resort pagination" className="mt-4">
                      <ul className="pagination justify-content-center gap-2 flex-wrap">
                        {/* Previous Button */}
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link rounded-pill px-3 py-1"
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            &laquo; Previous
                          </button>
                        </li>

                        {/* Page Numbers */}
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
                                className={`page-link rounded-circle px-3 py-1 ${
                                  currentPage === i + 1
                                    ? "bg-primary text-white border-primary"
                                    : "text-primary border-primary"
                                }`}
                                onClick={() => handlePageChange(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          )
                        )}

                        {/* Next Button */}
                        <li
                          className={`page-item ${
                            currentPage === resortData.pagination.last_page
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link rounded-pill px-3 py-1"
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            Next &raquo;
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              ) : (
                <p className="text-center mt-5 text-muted">No resorts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
