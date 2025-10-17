"use client";

export default function GlobalLoading() {
  return (
    <div className="full-page-loader d-flex flex-column align-items-center justify-content-center">
      <img
        src="/HMS Loading.gif"
        alt="Loading..."
        className="mb-3"
        style={{
          width: "280px",
          height: "280px",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
