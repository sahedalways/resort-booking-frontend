"use client";

import { useState, useRef, useCallback, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ResortFacilities from "@/src/components/ResortFacilities";
import ResortFilter from "@/src/components/ResortFilter";
import { ResortContext } from "../hooks/api/ResortContext";

export default function ResortsPage() {
  const { resortsInfo, isResortLoading, fetchAllResorts } =
    useContext(ResortContext);

  // ✅ Safe default states
  const [resorts, setResorts] = useState([]);
  const [filteredResorts, setFilteredResorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  // ✅ Fetch once on mount
  useEffect(() => {
    fetchAllResorts().catch(console.error);
  }, []);

  // ✅ Sync context data to local state
  useEffect(() => {
    if (resortsInfo?.resort_info?.length) {
      setResorts(resortsInfo.resort_info);
      setFilteredResorts(resortsInfo.resort_info);
      setCurrentPage(resortsInfo.pagination?.current_page || 1);
      setLastPage(resortsInfo.pagination?.last_page || 1);
    }
  }, [resortsInfo]);

  // ✅ Infinite scroll
  const lastResortRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && currentPage < lastPage) {
          setLoading(true);
          try {
            const newData = await fetchAllResorts(currentPage + 1);
            if (newData?.resort_info?.length) {
              setResorts((prev) => [...prev, ...newData.resort_info]);
              setFilteredResorts((prev) => [...prev, ...newData.resort_info]);
              setCurrentPage(
                newData.pagination?.current_page || currentPage + 1
              );
              setLastPage(newData.pagination?.last_page || lastPage);
            }
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

  // ✅ Filter handler
  const handleFilterChange = (selectedRanges) => {
    if (!selectedRanges?.length) {
      setFilteredResorts(resorts);
      return;
    }

    const filtered = resorts.filter((resort) => {
      const low = parseFloat(resort.lowest_price) || 0;
      const high = parseFloat(resort.highest_price) || 0;

      return selectedRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);

        const isLowInRange = low >= min && low <= max;
        const isHighInRange = high >= min && high <= max;

        return isLowInRange || isHighInRange;
      });
    });

    setFilteredResorts(filtered);
  };

  if (isResortLoading && resorts.length === 0)
    return (
      <div className="container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="resort-card row mb-4 p-3 border rounded">
            <div className="col-lg-3">
              <Skeleton height={180} />
            </div>
            <div className="col-lg-7">
              <Skeleton height={25} width={`60%`} className="mb-2" />
              <Skeleton height={20} width={`40%`} className="mb-2" />
              <Skeleton height={15} count={3} />
            </div>
            <div className="col-lg-2 text-end">
              <Skeleton height={25} width={80} className="mb-2" />
              <Skeleton height={30} width={100} />
            </div>
          </div>
        ))}
      </div>
    );

  if (!resorts.length)
    return <p className="text-center mt-5 text-muted">No resorts found.</p>;

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
