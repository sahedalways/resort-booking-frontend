"use client";

import { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Link from "next/link";
import Image from "next/image";

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState("resort");
  const [searchFor, setSearchFor] = useState([]);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Sara Resort");
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

  const locationRef = useRef(null);
  const calendarRef = useRef(null);

  const locations = [
    {
      name: "Sara Resort",
      subtitle: "A beautiful resort",
      image: "/img/resort_icon.png",
    },
    {
      name: "Dream Valley",
      subtitle: "A dreamy valley",
      image: "/img/resort_icon.png",
    },
    {
      name: "Ocean Breeze",
      subtitle: "A breezy ocean",
      image: "/img/resort_icon.png",
    },
    {
      name: "Mountain View",
      subtitle: "A view of the mountains",
      image: "/img/resort_icon.png",
    },
    {
      name: "Green Garden",
      subtitle: "A green garden",
      image: "/img/resort_icon.png",
    },
    {
      name: "Skyline Resort",
      subtitle: "A resort in the skyline",
      image: "/img/resort_icon.png",
    },
    {
      name: "Golden Sands",
      subtitle: "Golden sands",
      image: "/img/resort_icon.png",
    },
    {
      name: "Lakeside Retreat",
      subtitle: "A retreat by the lake",
      image: "/img/resort_icon.png",
    },
  ];

  const handleSearchForChange = (e) => {
    const { value, checked } = e.target;
    setSearchFor((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      activeTab,
      searchFor,
      selectedLocation,
      dateRange,
    });
  };

  // Close dropdown on outside click
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [rooms, setRooms] = useState([{ adults: 2, children: 0 }]);
  const [expandedRoom, setExpandedRoom] = useState(0);

  const roomsRef = useRef(null);

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
    handleResize(); // Call it once to set the initial direction

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

  return (
    <div className="search-container">
      {/* Tabs */}
      <div className="tab-buttons col-lg-4 col-md-6 col-10">
        <button
          type="button"
          className={`tab-btn ${activeTab === "resort" ? "active" : ""}`}
          onClick={() => setActiveTab("resort")}
        >
          <Image
            src="/img/resort_icon.png"
            className="img-fluid"
            alt=""
            width={30}
            height={30}
          />
          Resort
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === "event" ? "active" : ""}`}
          onClick={() => setActiveTab("event")}
        >
          <Image
            src="/img/Event_icon.png"
            className="img-fluid"
            alt=""
            width={30}
            height={30}
          />
          Event
        </button>
      </div>

      {/* Resort Form */}
      {activeTab === "resort" && (
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
                    <div className="value">{selectedLocation}</div>
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
                      {locations
                        .filter((loc) =>
                          loc.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((loc) => (
                          <div className="col-12 col-lg-6 mb-2" key={loc.name}>
                            <Link
                              href="#"
                              className={`btn w-100 text-start d-flex align-items-center ${
                                selectedLocation === loc.name
                                  ? "btn-primary"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() => {
                                setSelectedLocation(loc.name);
                                setLocationOpen(false);
                              }}
                            >
                              <Image
                                className="img-fluid"
                                src={loc.image}
                                alt={loc.name}
                                width={40}
                                height={40}
                                style={{
                                  marginRight: "15px",
                                }}
                              />
                              <div>
                                <h5>{loc.name}</h5>
                                <p>{loc.subtitle}</p>
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

            {/* Search For */}
            <div className="search-for-wrapper mt-3">
              <span className="form-label mb-0">Search for</span>
              <div className="form-check-group">
                {["Business", "Family", "Couple", "Friend", "Solo"].map(
                  (option) => (
                    <div className="form-check form-check-inline" key={option}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`check-${option}`}
                        value={option}
                        onChange={handleSearchForChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`check-${option}`}
                      >
                        {option}
                      </label>
                    </div>
                  )
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
      )}

      {/* Event Form */}
      {activeTab === "event" && (
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Event Type */}
              <div className="col-lg-4 col-md-6">
                <div className="form-field-wrapper">
                  <span className="form-label d-block text-muted">
                    Event Type
                  </span>
                  <div className="dropdown">
                    <button
                      className="btn btn-light form-control dropdown-toggle text-start"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select Event Type
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <Link className="dropdown-item" href="#">
                          Wedding
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Conference
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Birthday
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Corporate
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Other
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Event Date */}
              <div className="col-lg-4 col-md-6">
                <div className="form-field-wrapper">
                  <span className="form-label d-block text-muted">
                    Event Date
                  </span>
                  <div className="dropdown">
                    <button
                      className="btn btn-light form-control dropdown-toggle text-start"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select Date
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <Link className="dropdown-item" href="#">
                          22 Sep '25
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          23 Sep '25
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          24 Sep '25
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          25 Sep '25
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          26 Sep '25
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          Later
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="col-lg-4 col-md-6">
                <div className="form-field-wrapper">
                  <span className="form-label d-block text-muted">Guests</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-light form-control dropdown-toggle text-start"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select Guests
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <Link className="dropdown-item" href="#">
                          Less than 50
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          50 - 100
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          100 - 200
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          200 - 500
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          500 - 1000
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">
                          1000+
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="text-center src-btn-wrapper mt-4">
              <button
                type="submit"
                className="btn primary-bg search-btn custom-btn-style"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
