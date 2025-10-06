import { useState } from "react";

export default function ResortFacilities({ facilities }) {
  const [showAll, setShowAll] = useState(false);

  if (!facilities || facilities.length === 0) return null;

  // Make type_name unique
  const uniqueFacilitiesMap = new Map();
  facilities.forEach((f) => {
    if (!uniqueFacilitiesMap.has(f.type_name)) {
      uniqueFacilitiesMap.set(f.type_name, f);
    }
  });
  const uniqueFacilities = Array.from(uniqueFacilitiesMap.values());

  const visibleFacilities = showAll
    ? uniqueFacilities
    : uniqueFacilities.slice(0, 5);

  return (
    <div className="resort-amenities my-3">
      {visibleFacilities.map((f) => (
        <span key={f.id} className="me-2 d-inline-block">
          <i className={`${f.icon} me-1`}></i>
          {f.type_name}
        </span>
      ))}

      {uniqueFacilities.length > 5 && (
        <p
          onClick={() => setShowAll((prev) => !prev)}
          className="more-btn cursor-pointer"
        >
          {showAll ? "Show Less" : `+ ${uniqueFacilities.length - 5} more`}
        </p>
      )}
    </div>
  );
}
