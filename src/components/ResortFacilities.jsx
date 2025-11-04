import { useState } from "react";

export default function ResortFacilities({ facilities }) {
  const [hovered, setHovered] = useState(false);

  if (!facilities || facilities.length === 0) return null;

  const allChildFacilities = facilities.flatMap((f) => f.facility || []);
  const VISIBLE_COUNT = 5;
  const visibleFacilities = allChildFacilities.slice(0, VISIBLE_COUNT);
  const hiddenFacilities = allChildFacilities.slice(VISIBLE_COUNT);

  const FacilityItem = ({ child }) => (
    <div
      className="d-flex align-items-center"
      style={{
        flex: "0 0 33.3333%", // ✅ ensures 3 per row
        boxSizing: "border-box",
        padding: "4px 0",
        color: "#555",
      }}
    >
      <i
        className={`${child.icon} me-2`}
        style={{
          fontSize: "1.2rem",
          color: "#888",
        }}
      ></i>
      <span style={{ whiteSpace: "nowrap" }}>{child.type_name}</span>
    </div>
  );

  return (
    <div
      className="d-flex flex-wrap position-relative"
      style={{
        width: "100%",
        maxWidth: "550px",
        gap: "0px",
      }}
    >
      {visibleFacilities.map((child, index) => (
        <FacilityItem key={index} child={child} />
      ))}

      {hiddenFacilities.length > 0 && (
        <div
          className="fw-semibold position-relative d-inline-flex align-items-center"
          style={{
            flex: "0 0 33.3333%",
            fontSize: ".8rem",
            color: "#0f6393",
            userSelect: "none",
            cursor: "pointer",
            padding: "4px 0",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <i
            className="fa-solid fa-circle-plus me-1"
            style={{ fontSize: "0.8rem" }}
          ></i>
          {hiddenFacilities.length} more
          <div className={`facilities-overlay ${hovered ? "show" : ""}`}>
            {hiddenFacilities.map((child, i) => (
              <div
                key={i}
                className="d-flex align-items-center mb-1"
                style={{ fontSize: "0.9rem" }}
              >
                <i className={`${child.icon} me-2 text-light opacity-75`} />
                <span>{child.type_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr style={{ width: "100%", margin: "0", borderTop: "1px solid #ddd" }} />

      <style jsx>{`
        .facilities-overlay {
          position: absolute;
          bottom: 150%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(15, 15, 15, 0.9);
          color: #fff;
          padding: 10px 14px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(6px);
          min-width: 180px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s ease;
          z-index: 1000;
        }

        .facilities-overlay.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }

        .facilities-overlay::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(15, 15, 15, 0.9);
        }
      `}</style>
    </div>
  );
}
