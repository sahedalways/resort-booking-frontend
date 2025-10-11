// pages/booking/success.js
"use client";

import { clearLastAction } from "@/src/redux/slices/cartSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function BookingSuccess() {
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
            color: "var(--primary-deep, #0f3a63)",
          }}
        >
          ✅
        </div>

        <h1
          className="mb-3"
          style={{
            color: "var(--primary-deep, #0f3a63)",
            fontWeight: "700",
          }}
        >
          Booking Confirmed!
        </h1>

        <p
          className="mb-4"
          style={{
            color: "var(--secondary-deep, #006993)",
            fontSize: "1.1rem",
          }}
        >
          Thank you for your booking. Your reservation has been successfully
          confirmed.
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
            Explore More Resorts
          </a>
        </Link>
      </div>
    </div>
  );
}
