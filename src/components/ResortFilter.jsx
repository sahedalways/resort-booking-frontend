"use client";
import { useState } from "react";

const ResortFilter = ({ onFilterChange }) => {
  const [showFilter, setShowFilter] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [customRange, setCustomRange] = useState({
    min: "",
    max: "",
    enabled: false,
  });

  const toggleFilter = () => setShowFilter((prev) => !prev);

  // Preset price ranges
  const priceRanges = [
    [1_049, 4_050],
    [4_051, 6_050],
    [6_051, 9_050],
    [9_051, 12_050],
    [12_051, 15_050],
    [15_051, 19_050],
  ];

  const handleRangeSelect = (range) => {
    if (selectedRange == range) {
      setSelectedRange(null);
      onFilterChange([]);
    } else {
      setSelectedRange(range);
      onFilterChange([range]);
    }
  };

  // Handle custom range toggle
  const handleCustomToggle = () => {
    const updated = { ...customRange, enabled: !customRange.enabled };
    setCustomRange(updated);
    setSelectedRange(null);
    if (!updated.enabled) onFilterChange([]);
  };

  const handleCustomInput = (e) => {
    const { name, value } = e.target;

    const numericValue = value.replace(/[^0-9]/g, "");

    const updated = { ...customRange, [name]: numericValue };
    setCustomRange(updated);

    if (updated.enabled && updated.min && updated.max) {
      onFilterChange([`${updated.min}-${updated.max}`]);
    }
  };

  return (
    <div className="col-lg-3 col-md-5">
      <div className="price-filter">
        <div
          className="filter-header"
          onClick={toggleFilter}
          style={{ cursor: "pointer" }}
        >
          <h5 className="mb-0">Price Per Night</h5>
          <i
            className={`bi ${
              showFilter ? "bi-chevron-up" : "bi-chevron-down"
            } toggle-icon`}
          ></i>
        </div>

        {showFilter && (
          <>
            {/* Custom Budget Switch */}
            <div className="custom-budget d-flex align-items-center justify-content-between my-2">
              <span>Set your own budget</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={customRange.enabled}
                  onChange={handleCustomToggle}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Preset Price Ranges */}
            {!customRange.enabled && (
              <div className="price-options d-flex flex-column gap-1">
                {priceRanges.map(([min, max]) => {
                  const range = `${min}-${max}`;
                  return (
                    <label key={range} className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedRange === range}
                        onChange={() => handleRangeSelect(range)}
                        className="me-2"
                      />
                      BDT {min.toLocaleString()} - BDT {max.toLocaleString()}
                    </label>
                  );
                })}
              </div>
            )}

            {/* Custom Range Inputs */}
            {customRange.enabled && (
              <div className="custom-range-inputs mt-2">
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    name="min"
                    placeholder="Min BDT"
                    value={customRange.min}
                    onChange={handleCustomInput}
                    className="form-control form-control-sm shadow-none"
                  />
                  <input
                    type="text"
                    name="max"
                    placeholder="Max BDT"
                    value={customRange.max}
                    onChange={handleCustomInput}
                    className="form-control form-control-sm shadow-none"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResortFilter;
