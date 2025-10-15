"use client";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useState, useEffect } from "react";

const ResortFilter = ({ onFilterChange, maxPrice, minPrice }) => {
  const [showFilter, setShowFilter] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [customRange, setCustomRange] = useState({
    min: 0,
    max: 0,
    enabled: false,
  });
  const [priceRanges, setPriceRanges] = useState([]);

  const toggleFilter = () => setShowFilter((prev) => !prev);

  // Generate price ranges dynamically by 500
  useEffect(() => {
    const ranges = [];
    let start = minPrice;
    while (start < maxPrice) {
      const end = Math.min(start + 499, maxPrice);
      ranges.push([start, end]);
      start += 500;
    }
    setPriceRanges(ranges);

    // Set initial custom range in middle
    setCustomRange({
      min: Math.floor(minPrice + (maxPrice - minPrice) / 4),
      max: Math.ceil(minPrice + ((maxPrice - minPrice) * 3) / 4),
      enabled: false,
    });
  }, [minPrice, maxPrice]);

  const handleRangeSelect = (range) => {
    if (selectedRange === range) {
      setSelectedRange(null);
      onFilterChange([]);
    } else {
      setSelectedRange(range);
      onFilterChange([range]);
    }
  };

  const handleCustomToggle = () => {
    let updated;
    if (!customRange.enabled) {
      // Set handles to middle of min/max
      const middleMin = Math.floor(minPrice + (maxPrice - minPrice) / 4);
      const middleMax = Math.ceil(minPrice + ((maxPrice - minPrice) * 3) / 4);
      updated = { min: middleMin, max: middleMax, enabled: true };
      onFilterChange([`${middleMin}-${middleMax}`]);
    } else {
      updated = { ...customRange, enabled: false };
      onFilterChange([]);
    }
    setCustomRange(updated);
    setSelectedRange(null);
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

            {/* Custom Range Slider */}
            {customRange.enabled && (
              <div className="custom-range-slider mt-2">
                <Range
                  min={minPrice}
                  max={maxPrice}
                  step={50}
                  value={[customRange.min, customRange.max]}
                  onChange={(values) => {
                    const [min, max] = values;
                    const updated = { ...customRange, min, max };
                    setCustomRange(updated);
                    onFilterChange([`${min}-${max}`]);
                  }}
                  allowCross={false}
                  tipFormatter={(value) => `BDT ${value.toLocaleString()}`}
                  trackStyle={[{ backgroundColor: "#305fa5ff" }]}
                  handleStyle={[
                    { borderColor: "#0d6efd" },
                    { borderColor: "#0d6efd" },
                  ]}
                />
                <div className="d-flex justify-content-between mt-1">
                  <small>Min: BDT {customRange.min}</small>
                  <small>Max: BDT {customRange.max}</small>
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
