"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import ResortPolicyTable from "./ResortPolicyTable";
import Room from "./tab/Room";
import HotelRoomFacilities from "./tab/HotelRoomFacilities";
import Map from "./tab/Map";
import Review from "./Review";
import { ResortContext } from "@/src/app/hooks/api/ResortContext";

const ResortBelowTabs = ({ resortData, mapUrl }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { getReviews } = useContext(ResortContext);
  const [reviews, setReviews] = useState([]);

  // ✅ Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewList = await getReviews(resortData.id);
      setReviews(reviewList);
    };
    fetchReviews();
  }, [resortData.id, getReviews]);

  // ✅ Intersection Observer for sections (with pre-activation)
  useEffect(() => {
    const sections = document.querySelectorAll(
      "#overview, #rooms, #amenities, #location, #policies, #reviews"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveTab(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -80% 0px", // pre-activate a little before section reaches top
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // ✅ Fallback: activate overview near top
  useEffect(() => {
    const handleTopScroll = () => {
      if (window.scrollY < 100) setActiveTab("overview");
    };
    window.addEventListener("scroll", handleTopScroll);
    return () => window.removeEventListener("scroll", handleTopScroll);
  }, []);

  // ✅ Smooth scroll
  const handleScroll = (e, id) => {
    e.preventDefault();
    if (id === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.querySelector(`#${id}`);
      if (section) {
        const offset = 100;
        const sectionTop =
          section.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: sectionTop, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Sticky Tab Header */}
      <section className="overflow-x-hidden sticky-top bg-white shadow-sm zindex-10">
        <div className="row">
          <div className="col">
            <div className="custom-tab-header">
              <div className="container">
                <nav className="nav-container d-flex flex-wrap">
                  {[
                    "overview",
                    "rooms",
                    "amenities",
                    "location",
                    "policies",
                    "reviews",
                  ].map((tab) => (
                    <Link
                      key={tab}
                      href={`#${tab}`}
                      className={`nav-link ${
                        activeTab === tab ? "active" : ""
                      }`}
                      onClick={(e) => handleScroll(e, tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="section-gap-sm">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div id="overview" className="mb-5"></div>

              <div id="rooms" className="mb-5">
                {resortData?.rooms?.length > 0 ? (
                  resortData.rooms.map((room) => (
                    <Room key={room.id} room={room} resortName={resortData.name} />
                  ))
                ) : (
                  <p>No rooms available.</p>
                )}
              </div>

              <div id="amenities" className="mb-5">
                {resortData?.facilities?.length > 0 ? (
                  <HotelRoomFacilities resortData={resortData} />
                ) : (
                  <p>No facilities available.</p>
                )}
              </div>

              <div id="location" className="mb-5">
                {mapUrl ? (
                  <Map mapUrl={mapUrl} sectionTitle="Explore the neighbour" />
                ) : (
                  <p>Map not available.</p>
                )}
              </div>

              <div id="policies" className="mb-5">
                {resortData ? (
                  <ResortPolicyTable
                    resort={resortData}
                    sectionTitle="Important - Please Note:"
                  />
                ) : (
                  <p>No policies available.</p>
                )}
              </div>

              <div id="reviews" className="mb-5">
                <Review
                  resortData={resortData}
                  reviews={reviews}
                  setReviews={setReviews}
                  sectionTitle="Reviews & Ratings"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResortBelowTabs;
