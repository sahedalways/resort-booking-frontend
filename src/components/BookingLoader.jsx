// components/BookingLoader.jsx
"use client";

export default function BookingLoader() {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 9999,
        color: "#fff",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <div className="spinner-border text-light mb-3" role="status"></div>
      <h5 className="fw-semibold mb-2">Submitting your booking...</h5>
      <p style={{ maxWidth: "400px", fontSize: "0.95rem" }}>
        Please wait about <strong>2 minutes</strong> while we process your
        booking.
        <br />
        <strong className="mt-3">Do not refresh the page</strong> to ensure your
        booking is submitted successfully.
      </p>
    </div>
  );
}
