"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@/src/components/Skeleton";
import { fetchResortData } from "../services/resortService";
import ResortFacilities from "@/src/components/ResortFacilities";
import ResortFilter from "@/src/components/ResortFilter";

export default function ResortsPage({ resortData: initialData }) {
  const [resorts, setResorts] = useState(initialData.resort_info);
  const [currentPage, setCurrentPage] = useState(
    initialData.pagination.current_page
  );
  const [lastPage, setLastPage] = useState(initialData.pagination.last_page);
  const [loading, setLoading] = useState(false);
  const [filteredResorts, setFilteredResorts] = useState(
    initialData.resort_info
  );

  const observer = useRef();

  const lastResortRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && currentPage < lastPage) {
          setLoading(true);
          try {
            const newData = await fetchResortData(currentPage + 1);
            setResorts((prev) => [...prev, ...newData.resort_info]);
            setFilteredResorts((prev) => [...prev, ...newData.resort_info]);
            setCurrentPage(newData.pagination.current_page);
          } catch (err) {
            console.error(err.message);
          } finally {
            setLoading(false);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, currentPage, lastPage]
  );

  // ✅ Handle filter change
  const handleFilterChange = (selectedRanges) => {
    if (selectedRanges.length === 0) {
      setFilteredResorts(resorts);
      return;
    }

    const filtered = resorts.filter((resort) => {
      const price = resort.lowest_price || 0;
      return selectedRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return price >= min && price <= max;
      });
    });

    setFilteredResorts(filtered);
  };

  if (!resorts || (loading && resorts.length === 0))
    return <Skeleton type="resorts" />;

  const lowestPrice = Math.min(
    ...resorts.map((r) => parseFloat(r.lowest_price || 0))
  );
  const highestPrice = Math.max(
    ...resorts.map((r) => parseFloat(r.highest_price || 0))
  );

  return (
    <section className="section-gap resorts border-bottom">
      <div className="container">
        <div className="row g-4">
          {/* Left Side (Filter Section) */}
          <ResortFilter
            onFilterChange={handleFilterChange}
            minPrice={lowestPrice}
            maxPrice={highestPrice}
          />

          {/* Right Side (Resorts Content Section) */}
          <div className="col-lg-9 col-md-7">
            <div className="resorts-content">
              {filteredResorts.length > 0 ? (
                filteredResorts.map((resort, index) => {
                  // Add ref to last resort card for infinite scroll
                  const isLast = index === filteredResorts.length - 1;
                  return (
                    <div
                      key={resort.id}
                      className="resort-card row mb-4"
                      ref={isLast ? lastResortRef : null}
                    >
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
                        <Link
                          href={`/resorts/${resort.id}`}
                          className="text-decoration-none"
                        >
                          <h5 className="resort-name mb-1">{resort.name}</h5>
                        </Link>

                        <div className="d-flex gap-4 resort-location">
                          <span>Resort - {resort.distance} km</span>
                          <span>
                            <i className="bi bi-geo-alt-fill me-1"></i>
                            {resort.location}
                          </span>
                        </div>

                        <div className="resort-amenities my-2">
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
                  );
                })
              ) : (
                <p className="text-center mt-5 text-muted">No resorts found.</p>
              )}

              {loading && <Skeleton type="resorts" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
