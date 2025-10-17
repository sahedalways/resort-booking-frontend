import { useState } from "react";

export default function ResortFacilities({ facilities }) {
  const [hovered, setHovered] = useState(false);

  if (!facilities || facilities.length === 0) return null;

  const allChildFacilities = facilities.flatMap((f) => f.facility || []);
  const visibleFacilities = allChildFacilities.slice(0, 5);
  const hiddenFacilities = allChildFacilities.slice(5);

  return (
    <div className="position-relative d-inline-block">
      {/* Visible Facilities */}
      {visibleFacilities.map((child, index) => (
        <span key={index} className="me-2 d-inline-block">
          <i className={`${child.icon} me-1`}></i>
          {child.type_name}
        </span>
      ))}

      {/* Hoverable "+ more" Button */}
      {hiddenFacilities.length > 0 && (
        <span
          className="fw-semibold position-relative"
          style={{
            cursor: "pointer",
            fontSize: "0.85rem",
            color: "#0f3a63",
            userSelect: "none",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          + {hiddenFacilities.length} more
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
        </span>
      )}

      {/* Inline CSS for a clean look */}
      <style jsx>{`
        .facilities-overlay {
          position: absolute;
          bottom: 120%;
          left: 0;
          background: rgba(15, 15, 15, 0.9);
          color: #fff;
          padding: 10px 14px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(6px);
          min-width: 180px;
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
          transition: all 0.25s ease;
          z-index: 1000;
        }

        .facilities-overlay.show {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .facilities-overlay::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 15px;
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
