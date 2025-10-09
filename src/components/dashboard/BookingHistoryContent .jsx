"use client";
import React from "react";

// eslint-disable-next-line react/display-name
const BookingHistoryContent = React.forwardRef(({ bookings = [] }, ref) => {
  const ContentHeader = ({ title, subtitle, showEdit = true }) => (
    <div className="d-flex justify-content-between align-items-end pb-3 border-bottom">
      <div>
        <h3 className="card-title fw-bold mb-0">{title}</h3>
        <p className="text-muted mb-0 small">{subtitle}</p>
      </div>
      {showEdit && (
        <a
          href="#"
          className="secondary-color text-decoration-none text-block-16 py-0"
        >
          <i className="bi bi-pencil-fill edit-icon me-1"></i> Edit
        </a>
      )}
    </div>
  );

  return (
    <div ref={ref} className="profile-content-card mb-4">
      <ContentHeader
        title="Booking History"
        subtitle="All your past and upcoming bookings"
        showEdit={false}
      />

      {bookings.length === 0 ? (
        <p className="text-center text-muted mt-3">No bookings found.</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Resort Name</th>
                <th>Rooms</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.resortName}</td>
                  <td>{booking.rooms}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "Confirmed"
                          ? "bg-success"
                          : booking.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export default BookingHistoryContent;
