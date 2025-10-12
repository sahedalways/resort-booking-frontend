"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  console.error(error);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-4"
      style={{ background: "#f8f9fa", color: "#333" }}
    >
      <h1 className="display-4 mb-3" style={{ color: "#0f3a63" }}>
        Oops! Something went wrong
      </h1>
      <p className="lead mb-4">
        {error?.message ||
          "An unexpected error occurred. Please try again later."}
      </p>
      <div className="mb-3">
        <img
          src="/img/undraw_page-not-found_6wni.svg"
          alt="Error illustration"
          style={{ maxWidth: "300px", width: "100%" }}
        />
      </div>
      <button
        onClick={() => reset?.()}
        className="btn btn-primary me-2 mb-3 mt-5"
        style={{ backgroundColor: "#0f3a63", borderColor: "#0f3a63" }}
      >
        Try Again
      </button>
      <Link
        href="/"
        className="btn btn-outline-secondary"
        style={{ color: "#0f3a63" }}
      >
        Go Home
      </Link>
    </div>
  );
}
