import Link from "next/link";
import ResortPolicyTable from "./ResortPolicyTable";
import { useState } from "react";
import Room from "./tab/Room";
import HotelRoomFacilities from "./tab/HotelRoomFacilities";
import Map from "./tab/Map";

const ResortBelowTabs = ({ resortData, mapUrl }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
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
                  <>
                    {resortData?.rooms?.map((room) => (
                      <Room key={room.id} room={room} />
                    ))}

                    {/* hotel and room facilities */}
                    <HotelRoomFacilities resortData={resortData} />

                    {/* full width map */}
                    <Map mapUrl={mapUrl} />

                    {/* note section */}
                    <ResortPolicyTable
                      resort={resortData}
                      sectionTitle="Important - Please Note:"
                    />
                  </>
                )}

                {activeTab === "rooms" && (
                  <>
                    {resortData?.rooms?.map((room) => (
                      <Room key={room.id} room={room} />
                    ))}
                  </>
                )}

                {activeTab === "amenities" && (
                  <>
                    {/* hotel and room facilities */}
                    <HotelRoomFacilities resortData={resortData} />
                  </>
                )}

                {activeTab === "location" && (
                  <>
                    {/* full width map */}
                    <Map mapUrl={mapUrl} />
                  </>
                )}

                {activeTab === "policies" && (
                  <>
                    {/* note section */}
                    <ResortPolicyTable
                      resort={resortData}
                      sectionTitle="Important - Please Note:"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResortBelowTabs;
