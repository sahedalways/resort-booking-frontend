/* eslint-disable react/display-name */
"use client";
import { DashboardContext } from "@/src/app/hooks/api/DashboardContext";
import React, { useContext, useEffect, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BookingHistoryContent = React.forwardRef((props, ref) => {
  const { getBookingHistory, bookingData, isLoadingBooking } =
    useContext(DashboardContext);

  useEffect(() => {
    getBookingHistory();
  }, []);

  // ✅ Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ✅ Get badge color based on status
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

  const ContentHeader = ({ title, subtitle, showEdit = true }) => (
    <div className="d-flex justify-content-between align-items-end pb-3 border-bottom flex-wrap">
      <div>
        <h3 className="card-title fw-bold mb-0">{title}</h3>
        <p className="text-muted mb-0 small">{subtitle}</p>
      </div>
      {showEdit && (
        <a
          href="#"
          className="secondary-color text-decoration-none text-block-16 py-0 mt-2 mt-md-0"
        >
          <i className="bi bi-pencil-fill edit-icon me-1"></i> Edit
        </a>
      )}
    </div>
  );

  // ✅ Group bookings by resort name + start + end date
  const groupedBookings = useMemo(() => {
    if (!bookingData) return [];

    const grouped = {};
    bookingData.forEach((b) => {
      const key = `${b.resort?.name}_${b.start_date}_${b.end_date}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(b);
    });

    return Object.values(grouped).map((group) => {
      const first = group[0];
      const totalPrice = group.reduce(
        (sum, item) => sum + parseFloat(item.amount || 0),
        0
      );
      return {
        resortName: first.resort?.name || "N/A",
        rooms: group.map((r) => r.room?.name || `Room ${r.room_id}`),
        startDate: first.start_date,
        endDate: first.end_date,
        totalPrice,
        status: first.status || "N/A",
      };
    });
  }, [bookingData]);

  // ✅ Statistics based on grouped items (NOT raw data)
  const stats = useMemo(() => {
    if (!groupedBookings.length)
      return { total: 0, confirmed: 0, pending: 0, cancelled: 0, completed: 0 };

    const lower = (s) => s?.toLowerCase() || "";
    const summary = {
      total: 0,
      confirmed: 0,
      pending: 0,
      cancelled: 0,
      completed: 0,
    };

    groupedBookings.forEach((b) => {
      summary.total++;
      if (lower(b.status) === "confirmed") summary.confirmed++;
      else if (lower(b.status) === "pending") summary.pending++;
      else if (lower(b.status) === "cancelled") summary.cancelled++;
      else if (lower(b.status) === "completed") summary.completed++;
    });

    return summary;
  }, [groupedBookings]);

  return (
    <div ref={ref} className="profile-content-card mb-4">
      <ContentHeader
        title="Booking History"
        subtitle="All your past and upcoming bookings"
        showEdit={false}
      />

      {/* ✅ Summary Boxes */}
      <div className="row mt-3 g-3">
        {[
          { label: "Total Bookings", color: "text-dark", value: stats.total },
          { label: "Confirmed", color: "text-success", value: stats.confirmed },
          { label: "Pending", color: "text-warning", value: stats.pending },
          { label: "Cancelled", color: "text-danger", value: stats.cancelled },
          { label: "Completed", color: "text-primary", value: stats.completed },
        ].map((item, index) => (
          <div className="col-lg-2 col-md-3 col-sm-6 col-6" key={index}>
            <div className="card shadow-sm border-0 text-center p-3 rounded-3 h-100">
              <h6 className={`${item.color} mb-1`}>{item.label}</h6>
              <h4 className={`fw-bold ${item.color} mb-0`}>
                {isLoadingBooking ? <Skeleton width={50} /> : item.value || 0}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Responsive Booking Table */}
      {isLoadingBooking ? (
        <div className="table-responsive mt-4">
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
                  {Array(6)
                    .fill(0)
                    .map((__, j) => (
                      <td key={j}>
                        <Skeleton width={j === 1 ? 80 : 100} />
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : groupedBookings.length === 0 ? (
        <p className="text-center text-muted mt-4">No bookings found.</p>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table table-bordered align-middle">
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
              {groupedBookings.map((item, index) => (
                <tr key={index}>
                  <td data-label="Resort Name">{item.resortName}</td>
                  <td data-label="Rooms">
                    <ul className="mb-0 ps-3">
                      {item.rooms.map((r, i) => (
                        <li key={i}>{r} x 1</li>
                      ))}
                    </ul>
                  </td>
                  <td data-label="Start Date">{formatDate(item.startDate)}</td>
                  <td data-label="End Date">{formatDate(item.endDate)}</td>
                  <td data-label="Total Price">{item.totalPrice.toFixed(2)}</td>
                  <td data-label="Status">
                    <span
                      className={`badge ${getStatusBadgeClass(item.status)}`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Mobile Responsive Table CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          table thead {
            display: none;
          }
          table,
          table tbody,
          table tr,
          table td {
            display: block;
            width: 100%;
          }
          table tr {
            margin-bottom: 1rem;
            border: 1px solid #dee2e6;
            border-radius: 0.5rem;
            padding: 0.5rem;
          }
          table td {
            text-align: right;
            padding-left: 50%;
            position: relative;
          }
          table td::before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            width: 50%;
            padding-left: 1rem;
            font-weight: 600;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
});

export default BookingHistoryContent;
