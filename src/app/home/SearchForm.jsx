"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@/src/components/Skeleton";
import { toast } from "react-toastify";
import { HomeContext } from "../hooks/api/HomeContext";

const SearchForm = ({ resortData }) => {
  const { isLoadingSubmitting, searchResort } = useContext(HomeContext);

  if (!resortData) return <Skeleton type="searchForm" />;

  // ✅ Separate states for check-in and check-out
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("resort");
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedResort, setSelectedResort] = useState({ id: null, name: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const [roomsOpen, setRoomsOpen] = useState(false);
  const [rooms, setRooms] = useState([{ adults: 2, children: 0 }]);
  const [expandedRoom, setExpandedRoom] = useState(0);

  const roomsRef = useRef(null);
  const locationRef = useRef(null);

  const handleGuestChange = (index, type, value) => {
    const newRooms = [...rooms];
    newRooms[index][type] += value;
    if (newRooms[index][type] < 0) newRooms[index][type] = 0;
    setRooms(newRooms);
  };

  const addRoom = () => setRooms([...rooms, { adults: 1, children: 0 }]);
  const deleteRoom = (index) => setRooms(rooms.filter((_, i) => i !== index));
  const getTotalGuests = () =>
    rooms.reduce((t, r) => t + r.adults + r.children, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target))
        setLocationOpen(false);
      if (roomsRef.current && !roomsRef.current.contains(event.target))
        setRoomsOpen(false);
      if (!event.target.closest(".calendar-dropdown")) {
        setCheckInOpen(false);
        setCheckOutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

  const handleSelectResort = (resort) => {
    setSelectedResort({ id: resort.id, name: resort.name });
    setLocationOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedResort.id) {
      toast.error("Please select a resort first.");
      return;
    }

    const payload = {
      resort_id: selectedResort.id,
      check_in: checkInDate.toISOString().split("T")[0],
      check_out: checkOutDate.toISOString().split("T")[0],
      rooms,
    };

    await searchResort(payload);
  };

  return (
    <div className="search-container">
      {/* Tabs */}
      <div className="tab-buttons col-lg-4 col-md-6 col-10 justify-content-center">
        <div
          type="button"
          className={`tab-btn resort-tab ${
            activeTab === "resort" ? "active" : ""
          }`}
          onClick={() => setActiveTab("resort")}
        >
          <Image
            src="/img/resort_icon.png"
            width={30}
            height={30}
            alt="Resort Icon"
          />
          Resort
        </div>
      </div>

      <div className="form-content">
        <form onSubmit={handleSubmit} className="position-relative">
          <div className="row g-3">
            {/* Resort Selection */}
            <div className="col-lg-3 col-12" ref={locationRef}>
              <div
                className="form-field-wrapper"
                onClick={() => setLocationOpen(!locationOpen)}
              >
                <span className="label">Resort/Area</span>
                <div className="value">
                  {selectedResort.name || "Select Resort"}
                </div>
              </div>
              {locationOpen && (
                <div className="location-dropdown shadow p-3 mt-2 bg-white rounded position-absolute col-lg-8">
                  <input
                    type="text"
                    className="form-control mb-3 shadow-none"
                    placeholder="Search Resort..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="row">
                    {resortData
                      .filter((r) =>
                        r.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((r) => (
                        <div className="col-12 col-lg-6 mb-2" key={r.id}>
                          <Link
                            href="#"
                            className={`btn w-100 text-start d-flex align-items-center ${
                              selectedResort.id === r.id
                                ? "btn-primary"
                                : "btn-outline-secondary"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelectResort(r);
                            }}
                          >
                            {r.images[0] && (
                              <Image
                                src={r.images[0].image}
                                width={40}
                                height={40}
                                alt={r.name}
                                className="me-2"
                              />
                            )}
                            <div>
                              <h5>{r.name}</h5>
                              <p>{r.location}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Check In */}
            <div className="col-lg-3 col-12 position-relative">
              <div
                className="form-field-wrapper"
                onClick={() => setCheckInOpen(!checkInOpen)}
              >
                <span className="label">Check In</span>
                <div className="value">{formatDate(checkInDate)}</div>
              </div>
              {checkInOpen && (
                <div className="calendar-dropdown shadow p-3 mt-2 bg-white rounded position-absolute">
                  <DateRangePicker
                    ranges={[
                      {
                        startDate: checkInDate,
                        endDate: checkInDate,
                        key: "selection",
                      },
                    ]}
                    onChange={(item) =>
                      setCheckInDate(item.selection.startDate)
                    }
                    months={1}
                    direction="vertical"
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    staticRanges={[]}
                    inputRanges={[]}
                  />
                  <button
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => setCheckInOpen(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Check Out */}
            <div className="col-lg-3 col-12 position-relative">
              <div
                className="form-field-wrapper"
                onClick={() => setCheckOutOpen(!checkOutOpen)}
              >
                <span className="label">Check Out</span>
                <div className="value">{formatDate(checkOutDate)}</div>
              </div>
              {checkOutOpen && (
                <div className="calendar-dropdown shadow p-3 mt-2 bg-white rounded position-absolute">
                  <DateRangePicker
                    ranges={[
                      {
                        startDate: checkOutDate,
                        endDate: checkOutDate,
                        key: "selection",
                      },
                    ]}
                    onChange={(item) =>
                      setCheckOutDate(item.selection.startDate)
                    }
                    months={1}
                    direction="vertical"
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    staticRanges={[]}
                    inputRanges={[]}
                  />
                  <button
                    className="btn btn-primary mt-2 w-100"
                    onClick={() => setCheckOutOpen(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Rooms & Guests */}
            <div className="col-lg-3 col-12 position-relative" ref={roomsRef}>
              <div
                className="form-field-wrapper"
                onClick={() => setRoomsOpen(!roomsOpen)}
              >
                <span className="label">Rooms & Guests</span>
                <div className="value">
                  {rooms.length} Room, {getTotalGuests()} Guests
                </div>
              </div>
              {roomsOpen && (
                <div className="rooms-dropdown shadow p-3 mt-2 bg-white rounded position-absolute">
                  {rooms.map((room, index) => (
                    <div
                      key={index}
                      className="room-item mb-3 border-bottom pb-3"
                    >
                      <div className="room-header d-flex justify-content-between">
                        <div
                          className="room-title"
                          onClick={() =>
                            setExpandedRoom(expandedRoom === index ? -1 : index)
                          }
                        >
                          Room {index + 1}
                        </div>
                        <Link
                          href="#"
                          className="ms-2"
                          onClick={() => deleteRoom(index)}
                        >
                          <i className="bi bi-trash3 text-danger"></i>
                        </Link>
                      </div>
                      {expandedRoom === index && (
                        <div className="room-details mt-2">
                          {/* Adults */}
                          <div className="counter d-flex justify-content-between align-items-center mb-2 border-top pt-2">
                            <div>
                              <span className="fw-semibold">Adults</span>
                              <div>10+ years</div>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                onClick={() =>
                                  handleGuestChange(index, "adults", -1)
                                }
                              >
                                <i className="bi bi-dash-circle"></i>
                              </Link>
                              <span className="mx-2">{room.adults}</span>
                              <Link
                                href="#"
                                onClick={() =>
                                  handleGuestChange(index, "adults", 1)
                                }
                              >
                                <i className="bi bi-plus-circle"></i>
                              </Link>
                            </div>
                          </div>
                          {/* Children */}
                          <div className="counter d-flex justify-content-between align-items-center border-top pt-2">
                            <div>
                              <span className="fw-semibold">Children</span>
                              <div>0 to 10 years</div>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                onClick={() =>
                                  handleGuestChange(index, "children", -1)
                                }
                              >
                                <i className="bi bi-dash-circle"></i>
                              </Link>
                              <span className="mx-2">{room.children}</span>
                              <Link
                                href="#"
                                onClick={() =>
                                  handleGuestChange(index, "children", 1)
                                }
                              >
                                <i className="bi bi-plus-circle"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn-link"
                      onClick={addRoom}
                    >
                      Add New Room
                    </button>
                    <button
                      type="button"
                      className="btn-link active"
                      onClick={() => setRoomsOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Submit Button */}
        <div className="text-center src-btn-wrapper mt-3">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn primary-bg search-btn custom-btn-style d-flex align-items-center justify-content-center"
            disabled={isLoadingSubmitting}
          >
            {isLoadingSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
