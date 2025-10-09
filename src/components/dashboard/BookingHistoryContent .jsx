"use client";
import { DashboardContext } from "@/src/app/hooks/api/DashboardContext";
import React, { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// eslint-disable-next-line react/display-name
const BookingHistoryContent = React.forwardRef((props, ref) => {
  const { getBookingHistory, bookingData, isLoadingBooking } =
    useContext(DashboardContext);

  useEffect(() => {
    getBookingHistory();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
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

  // Group bookings by resort name + start date
  const groupedBookings = bookingData?.reduce((acc, booking) => {
    const key = `${booking.resort?.name}_${booking.start_date}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(booking);
    return acc;
  }, {});

  return (
    <div ref={ref} className="profile-content-card mb-4">
      <ContentHeader
        title="Booking History"
        subtitle="All your past and upcoming bookings"
        showEdit={false}
      />

      {isLoadingBooking ? (
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Resort Name</th>
                <th>Rooms</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Price (৳)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton width={80} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={60} />
                  </td>
                  <td>
                    <Skeleton width={80} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !bookingData || bookingData.length === 0 ? (
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
                <th>Total Price (৳)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(groupedBookings).map((group, index) => {
                const resortName = group[0].resort?.name || "N/A";
                const startDate = formatDate(group[0].start_date);
                const endDate = formatDate(group[0].end_date);
                const totalPrice = group
                  .reduce((sum, b) => sum + parseFloat(b.amount), 0)
                  .toFixed(2);
                const status = group[0].status;

                return (
                  <tr key={index}>
                    <td>{resortName}</td>
                    <td>
                      <ul className="mb-0 ps-3">
                        {group.map((b) => (
                          <li key={b.id}>
                            {b.room?.name || `Room ${b.room_id}`} x 1
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                    <td>{totalPrice}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export default BookingHistoryContent;
