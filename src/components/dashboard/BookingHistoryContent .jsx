"use client";
import React from "react";
/* eslint-disable react/display-name */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const BookingHistoryContent = React.forwardRef((props, ref) => {
  const { bookingData, isLoading } = props;
  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  console.log("bookingData", bookingData);

  // Badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-warning text-dark";
      case "confirmed":
        return "bg-success";
      case "completed":
        return "bg-primary";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  // Count bookings by status
  const statusCounts = {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  if (bookingData && bookingData.length) {
    bookingData.forEach((item) => {
      const status = item.status?.toLowerCase();
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++;
      }
    });
  }

  return (
    <div ref={ref} className="profile-content-card mb-4">
      <div className="d-flex justify-content-between align-items-end pb-3 border-bottom flex-wrap">
        <div>
          <h3 className="card-title fw-bold mb-0">Booking History</h3>
          <p className="text-muted mb-0 small">
            All your past and upcoming bookings
          </p>
        </div>
      </div>

      {/* Summary Boxes */}
      <div className="row mt-4 g-3">
        {["pending", "confirmed", "completed", "cancelled"].map((status) => (
          <div key={status} className="col-6 col-md-3">
            <div className={`card text-center p-3 shadow-sm`}>
              <h5 className="fw-bold mb-2 text-capitalize">{status}</h5>
              <span
                className={`badge ${getStatusBadgeClass(status)} fs-6 p-2`}
                style={{ borderRadius: "0.5rem" }}
              >
                {statusCounts[status] || 0}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Cards */}
      {isLoading ? (
        <div className="d-flex flex-column gap-3 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center">
                <Skeleton width={120} height={20} />
                <Skeleton width={80} height={25} />
              </div>
              <div className="mt-2 d-flex justify-content-between">
                <Skeleton width={200} />
                <Skeleton width={100} />
              </div>
              <div className="mt-1">
                <Skeleton width="100%" height={15} />
              </div>
            </div>
          ))}
        </div>
      ) : !bookingData || bookingData.length === 0 ? (
        <p className="text-center text-muted mt-4">No bookings found.</p>
      ) : (
        <div className="d-flex flex-column gap-3 mt-4">
          {bookingData.map((item, index) => (
            <div
              key={index}
              className="card shadow-sm p-3"
              style={{ borderRadius: "12px", border: "1px solid #e0e0e0" }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
                  {item.resort?.name || "N/A"}
                </h6>
                <span
                  className={`badge ${getStatusBadgeClass(item.status)}`}
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.8rem",
                    borderRadius: "0.3rem",
                  }}
                >
                  {item.status?.charAt(0).toUpperCase() +
                    item.status?.slice(1) || "N/A"}
                </span>
              </div>

              <div className="row mt-2 text-muted small">
                <div className="col-6 col-md-3 mb-2">
                  <strong>Room / Package:</strong>{" "}
                  {item.room?.name || `Room ${item.room_id}`}
                </div>
                <div className="col-6 col-md-3 mb-2">
                  <strong>Check In:</strong> {formatDate(item.start_date)}
                </div>
                <div className="col-6 col-md-3 mb-2">
                  <strong>Check Out:</strong> {formatDate(item.end_date)}
                </div>
                <div className="col-6 col-md-3 mb-2">
                  <strong>Total Price:</strong> ৳{" "}
                  {parseFloat(item.amount || 0).toFixed(2)}
                </div>
                <div className="mt-2 text-muted small">
                  <strong>Invoice No:</strong> {item.invoice_no || "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default BookingHistoryContent;
