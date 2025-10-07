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
                    {resortData?.rooms?.length > 0 ? (
                      resortData.rooms.map((room) => (
                        <Room key={room.id} room={room} />
                      ))
                    ) : (
                      <p>No rooms available.</p>
                    )}

                    {/* hotel and room facilities */}
                    {resortData?.facilities?.length > 0 ? (
                      <HotelRoomFacilities resortData={resortData} />
                    ) : (
                      <p>No facilities available.</p>
                    )}

                    {/* full width map */}
                    {mapUrl ? (
                      <Map mapUrl={mapUrl} />
                    ) : (
                      <p>Map not available.</p>
                    )}

                    {/* note section */}
                    {resortData ? (
                      <ResortPolicyTable
                        resort={resortData}
                        sectionTitle="Important - Please Note:"
                      />
                    ) : (
                      <p>No policies available.</p>
                    )}
                  </>
                )}

                {activeTab === "rooms" && (
                  <>
                    {resortData?.rooms?.length > 0 ? (
                      resortData.rooms.map((room) => (
                        <Room key={room.id} room={room} />
                      ))
                    ) : (
                      <p>No rooms available.</p>
                    )}
                  </>
                )}

                {activeTab === "amenities" && (
                  <>
                    {resortData?.facilities?.length > 0 ? (
                      <HotelRoomFacilities resortData={resortData} />
                    ) : (
                      <p>No facilities available.</p>
                    )}
                  </>
                )}

                {activeTab === "location" && (
                  <>
                    {mapUrl ? (
                      <Map mapUrl={mapUrl} />
                    ) : (
                      <p>Map not available.</p>
                    )}
                  </>
                )}

                {activeTab === "policies" && (
                  <>
                    {resortData ? (
                      <ResortPolicyTable
                        resort={resortData}
                        sectionTitle="Important - Please Note:"
                      />
                    ) : (
                      <p>No policies available.</p>
                    )}
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
