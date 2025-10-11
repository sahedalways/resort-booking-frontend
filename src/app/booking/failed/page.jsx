// pages/booking/failed.js
"use client";

import { clearLastAction } from "@/src/redux/slices/cartSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function BookingFailed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearLastAction());
  }, [dispatch]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="text-center p-5 rounded shadow"
        style={{ backgroundColor: "#ffffff", maxWidth: "500px", width: "90%" }}
      >
        <div
          className="mb-4"
          style={{
            fontSize: "3rem",
            color: "#dc3545",
          }}
        >
          ❌
        </div>

        <h1
          className="mb-3"
          style={{
            color: "#dc3545",
            fontWeight: "700",
          }}
        >
          Booking Failed
        </h1>

        <p
          className="mb-4"
          style={{
            color: "var(--secondary-deep, #006993)",
            fontSize: "1.1rem",
          }}
        >
          Unfortunately, your booking could not be completed. Please try again
          or select another resort/room.
        </p>

        <Link href="/resorts">
          <a
            className="btn btn-lg"
            style={{
              backgroundColor: "var(--secondary, #0083bb)",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "0.5rem",
            }}
          >
            Browse Resorts
          </a>
        </Link>
      </div>
    </div>
  );
}
