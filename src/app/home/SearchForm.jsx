"use client";

import { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@/src/components/Skeleton";

const SearchForm = ({ resortData }) => {
  if (!resortData) return <Skeleton type="searchForm" />;

  const [activeTab, setActiveTab] = useState("resort");
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedResort, setSelectedResort] = useState({ id: null, name: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateRangePickerDirection, setDateRangePickerDirection] =
    useState("horizontal");

  const [roomsOpen, setRoomsOpen] = useState(false);
  const [rooms, setRooms] = useState([{ adults: 2, children: 0 }]);
  const [expandedRoom, setExpandedRoom] = useState(0);

  const roomsRef = useRef(null);
  const locationRef = useRef(null);
  const calendarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      activeTab,
      dateRange,
    });
  };

  const handleGuestChange = (index, type, value) => {
    const newRooms = [...rooms];
    newRooms[index][type] += value;
    if (newRooms[index][type] < 0) {
      newRooms[index][type] = 0;
    }
    setRooms(newRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };

  const deleteRoom = (index) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
  };

  const getTotalGuests = () => {
    return rooms.reduce(
      (total, room) => total + room.adults + room.children,
      0
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 991) {
        setDateRangePickerDirection("vertical");
      } else {
        setDateRangePickerDirection("horizontal");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
      if (roomsRef.current && !roomsRef.current.contains(event.target)) {
        setRoomsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const handleSelectResort = (resort) => {
    setSelectedResort({ id: resort.id, name: resort.name });
    setLocationOpen(false);
  };

  return (
    <div className="search-container">
      {/* Tabs */}
      <div className="tab-buttons col-lg-4 col-md-6 col-10">
        {/* Resort Tab */}
        <button
          type="button"
          className={`tab-btn resort-tab ${
            activeTab === "resort" ? "active" : ""
          }`}
          onClick={() => setActiveTab("resort")}
        >
          <Image
            src="/img/resort_icon.png"
            className="img-fluid me-2"
            alt="Resort Icon"
            width={30}
            height={30}
          />
          Resort
        </button>

        {/* Event Tab */}
        <Link
          href="/events"
          className={`tab-btn event-tab no-underline ${
            activeTab === "event" ? "active" : ""
          }`}
          onClick={() => setActiveTab("event")}
        >
          <Image
            src="/img/Event_icon.png"
            className="img-fluid me-2"
            alt="Event Icon"
            width={30}
            height={30}
          />
          Event
        </Link>
      </div>

      {/* Resort Form */}

      <div className="form-content">
        <form onSubmit={handleSubmit} className="position-relative">
          <div className="row g-3">
            {/* Location */}

            <div className="col-lg-3 col-12" ref={locationRef}>
              <div
                className="form-field-wrapper"
                onClick={() => setLocationOpen(!locationOpen)}
              >
                <div className="location">
                  <span className="label">Resort/Area</span>
                  <div className="value">
                    {selectedResort.name || "Select Resort"}
                  </div>
                </div>
              </div>

              {/* Dropdown */}
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
                      .filter((loc) =>
                        loc.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((loc) => (
                        <div className="col-12 col-lg-6 mb-2" key={loc.id}>
                          <Link
                            href="#"
                            className={`btn w-100 text-start d-flex align-items-center ${
                              selectedResort.id === loc.id
                                ? "btn-primary"
                                : "btn-outline-secondary"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelectResort(loc);
                            }}
                          >
                            {loc.images[0] && (
                              <Image
                                className="img-fluid"
                                src={loc.images[0].image}
                                alt={loc.name}
                                width={40}
                                height={40}
                                style={{ marginRight: "15px" }}
                              />
                            )}
                            <div>
                              <h5>{loc.name}</h5>
                              <p>{loc.location}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Check In / Check Out */}
            <div className="col-lg-6 col-12" ref={calendarRef}>
              <div className="row g-3">
                <div
                  className="col-md-6 col-12"
                  onClick={() => setCalendarOpen(!calendarOpen)}
                >
                  <div className="form-field-wrapper">
                    <span className="label">Check In</span>
                    <div className="value">
                      {formatDate(dateRange[0].startDate)}
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-12"
                  onClick={() => setCalendarOpen(!calendarOpen)}
                >
                  <div className="form-field-wrapper">
                    <span className="label">Check Out</span>
                    <div className="value">
                      {formatDate(dateRange[0].endDate)}
                    </div>
                  </div>
                </div>
              </div>

              {calendarOpen && (
                <div
                  className="calendar-dropdown shadow p-3 mt-2 bg-white rounded position-absolute"
                  style={{ zIndex: 100 }}
                >
                  <DateRangePicker
                    onChange={(item) => setDateRange([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={dateRange}
                    direction={dateRangePickerDirection}
                    staticRanges={[]} // ⬅ removes Today, Yesterday, This Week
                    inputRanges={[]} // ⬅ removes custom input ranges
                  />
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setCalendarOpen(false)}
                    >
                      Done
                    </button>
                  </div>
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
                  {rooms.length} Room, {getTotalGuests()} Guests <br />
                  {/*<span style={{fontSize: '12px'}}>({getTotalAdults()} Adults, {getTotalChildren()} Children)</span>*/}
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
                        <div className="d-flex w-100 justify-content-between">
                          <div
                            className="room-title"
                            onClick={() =>
                              setExpandedRoom(
                                expandedRoom === index ? -1 : index
                              )
                            }
                          >
                            Room {index + 1}
                          </div>
                          <div className="person-count">
                            <span
                              onClick={() =>
                                setExpandedRoom(
                                  expandedRoom === index ? -1 : index
                                )
                              }
                            >
                              {room.adults} Adults, {room.children} Children
                            </span>
                          </div>
                        </div>
                        <Link
                          href="#"
                          type="button"
                          className="ms-2"
                          onClick={() => deleteRoom(index)}
                        >
                          <i className="bi bi-trash3 text-danger"></i>
                        </Link>
                      </div>
                      {expandedRoom === index && (
                        <div className="room-details mt-2">
                          <div className="counter d-flex justify-content-between align-items-center mb-2 border-top pt-2">
                            <div className="d-flex flex-column">
                              <span className="fw-semibold">Adults</span>
                              <span>10+ years</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                type="button"
                                onClick={() =>
                                  handleGuestChange(index, "adults", -1)
                                }
                              >
                                <i className="bi bi-dash-circle"></i>
                              </Link>
                              <span className="mx-2">{room.adults}</span>
                              <Link
                                href="#"
                                type="button"
                                onClick={() =>
                                  handleGuestChange(index, "adults", 1)
                                }
                              >
                                <i className="bi bi-plus-circle"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="counter d-flex justify-content-between align-items-center border-top pt-2">
                            <div className="d-flex flex-column">
                              <span className="fw-semibold">Children</span>
                              <span>0 to 10 years</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                type="button"
                                onClick={() =>
                                  handleGuestChange(index, "children", -1)
                                }
                              >
                                <i className="bi bi-dash-circle"></i>
                              </Link>
                              <span className="mx-2">{room.children}</span>
                              <Link
                                href="#"
                                type="button"
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

        {/* Button */}
        <div className="text-center src-btn-wrapper">
          <button
            type="submit"
            className="btn primary-bg search-btn custom-btn-style"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
