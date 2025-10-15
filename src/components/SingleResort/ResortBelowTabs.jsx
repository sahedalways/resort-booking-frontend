"use client";

import { useEffect, useState, useContext, useRef } from "react";
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

  // prevent double trigger during click-scroll
  const isScrollingByClick = useRef(false);
  const tabRefs = useRef({});

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewList = await getReviews(resortData.id);
      setReviews(reviewList);
    };
    fetchReviews();
  }, [resortData.id, getReviews]);

  // Intersection Observer for all sections including overview
  useEffect(() => {
    const sections = document.querySelectorAll(
      "#overview, #rooms, #amenities, #location, #policies, #reviews"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingByClick.current) return;

        // find most visible section
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const topSection = visible[0].target.id;
          setActiveTab(topSection);
        } else {
          // fallback: if near top, set overview
          if (window.scrollY < 300) setActiveTab("overview");
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -70% 0px", // better balance between overview & rooms
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Auto horizontal scroll to active tab
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  // Smooth scroll to section
  const handleScroll = (e, id) => {
    e.preventDefault();

    isScrollingByClick.current = true;
    setActiveTab(id);

    let targetY = 0;
    const offset = 100; // adjust for sticky header

    if (id !== "overview") {
      const section = document.querySelector(`#${id}`);
      if (section) {
        targetY =
          section.getBoundingClientRect().top + window.pageYOffset - offset;
      }
    }

    window.scrollTo({ top: targetY, behavior: "smooth" });

    setTimeout(() => {
      isScrollingByClick.current = false;
    }, 800);
  };

  const tabs = [
    "overview",
    "rooms",
    "amenities",
    "location",
    "policies",
    "reviews",
  ];

  return (
    <>
      {/* Sticky Tab Header */}
      <section style={{background: '#f0f0f0'}} className="overflow-x-hidden sticky-top shadow-sm zindex-10">
        <div className="container">
            <div className="row">
          <div className="col-12">
            <div className="custom-tab-header">
              
                <nav className="nav-container d-flex overflow-auto">
                  {tabs.map((tab) => (
                    <Link
                      key={tab}
                      href={`#${tab}`}
                      className={`nav-link ${activeTab === tab ? "active" : ""}`}
                      onClick={(e) => handleScroll(e, tab)}
                      ref={(el) => (tabRefs.current[tab] = el)}
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
              {/* Overview */}
              <div id="overview" ></div>

              {/* Rooms */}
              <div id="rooms" >
                {resortData?.rooms?.length > 0 ? (
                  resortData.rooms.map((room) => (
                    <Room
                      key={room.id}
                      room={room}
                      resortName={resortData.name}
                    />
                  ))
                ) : (
                  <p>No rooms available.</p>
                )}
              </div>

              {/* Amenities */}
              <div id="amenities" >
                {resortData?.facilities?.length > 0 ? (
                  <HotelRoomFacilities resortData={resortData} />
                ) : (
                  <p>No facilities available.</p>
                )}
              </div>

              {/* Location */}
              <div id="location" >
                {mapUrl ? (
                  <Map mapUrl={mapUrl} sectionTitle="Explore The Neighbour" />
                ) : (
                  <p>Map not available.</p>
                )}
              </div>

              {/* Policies */}
              <div id="policies" >
                {resortData ? (
                  <ResortPolicyTable
                    resort={resortData}
                    sectionTitle="Important - Please Note:"
                  />
                ) : (
                  <p>No policies available.</p>
                )}
              </div>

              {/* Reviews */}
              <div id="reviews" >
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
