import { useState } from "react";

export default function ResortFacilities({ facilities }) {
  const [showAll, setShowAll] = useState(false);

  if (!facilities || facilities.length === 0) return null;

  // Flatten all child facilities into a single array
  const allChildFacilities = facilities.flatMap((f) => f.facility || []);

  const visibleFacilities = showAll
    ? allChildFacilities
    : allChildFacilities.slice(0, 5);

  return (
    <div>
      {visibleFacilities.map((child, index) => (
        <span key={index} className="me-2 d-inline-block">
          <i className={`${child.icon} me-1`}></i>
          {child.type_name}
        </span>
      ))}

      {allChildFacilities.length > 5 && (
        <p
          onClick={() => setShowAll((prev) => !prev)}
          style={{ cursor: "pointer" }}
          className="more-btn mt-2 mb-0"
        >
          {showAll ? "Show Less" : `+ ${allChildFacilities.length - 5} more`}
        </p>
      )}
    </div>
  );
}
