// app/loading.js
"use client";

export default function GlobalLoading() {
  return (
    <div className="full-page-loader">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
