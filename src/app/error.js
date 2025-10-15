"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  console.error(error);

  return (
    <div
      className="error-page d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        background: "#f8f9fa",
        color: "#333",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        padding: "2rem",
        overflowY: "auto",
      }}
    >
      <h1 className="display-4 mb-3" style={{ color: "#0f3a63" }}>
        Oops! Something went wrong
      </h1>
      <p className="lead mb-4">
        {error?.message ||
          "An unexpected error occurred. Please try again later."}
      </p>
      <div className="mb-4">
        <img
          src="/img/undraw_page-not-found_6wni.svg"
          alt="Error illustration"
          style={{ maxWidth: "300px", width: "100%" }}
        />
      </div>

      <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
        <button
          onClick={() => reset?.()}
          className="btn btn-primary px-4 py-2"
          style={{ backgroundColor: "#0f3a63", borderColor: "#0f3a63" }}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="btn btn-outline-primary px-4 py-2 go-home-link"
          style={{ color: "#0f3a63", borderColor: "#0f3a63" }}
        >
          Go Home
        </Link>
      </div>

      {/* Hover style */}
      <style jsx>{`
        .go-home-link:hover {
          background-color: #183149ff;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
