"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DaylongDatePicker({
  setCheckInDate,
  checkInDate,
  today,
}) {
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className="daylong-datepicker">
      {/* Button showing selected date */}
      <button
        className="btn d-flex align-items-center justify-content-between px-3"
        style={{
          backgroundColor: "#0083bb",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          minWidth: "200px",
          fontWeight: "500",
          cursor: "pointer",
          padding: "4px 10px",
          fontSize: "0.9rem",
        }}
        onClick={() => setShowModal(true)}
      >
        <div className="d-flex align-items-center gap-1">
          <i className="fas fa-calendar-alt"></i>
          {checkInDate ? formatDate(checkInDate) : "Select Check-In Date"}
        </div>
        <i className="fas fa-caret-down"></i>
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.35)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "0.5rem",
          }}
        >
          <div
            className="modal-container bg-white rounded shadow"
            style={{
              maxWidth: "350px",
              width: "100%",
              padding: "1rem",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0" style={{ fontSize: "1rem" }}>
                Select Check-In Date
              </h5>
              <button
                className="btn-close"
                style={{ padding: "0.25rem", fontSize: "0.8rem" }}
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <Calendar
              value={checkInDate}
              onChange={setCheckInDate}
              minDate={today}
              showNeighboringMonth={false}
              className="shadow-none"
            />

            <div className="mt-3 d-flex justify-content-end gap-1">
              <button
                className="btn btn-sm"
                style={{
                  backgroundColor: "#0083bb",
                  color: "#fff",
                  border: "none",
                  fontSize: "0.85rem",
                }}
                onClick={() => setShowModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
