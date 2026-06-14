import React, { useState, useCallback, memo } from "react";
import "../styles/FilterCom.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useFilter } from "../context/MyContext";

const FILTER_OPTIONS = [
  "All",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];

const FilterCom = memo(() => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Featured");
  const { setSortType, filterByCategory } = useFilter();

  const handleSelect = useCallback(
    (option) => {
      setSelected(option);
      if (option === "All") {
        setSortType("");
        filterByCategory("All");
      } else {
        setSortType(option);
      }
      setOpen(false);
    },
    [setSortType, filterByCategory],
  );

  return (
    <section className="product-toolbar-ux">
      <div className="product-toolbar-left">
        <button type="button" className="toolbar-filter-btn">
          <FilterAltIcon className="filter-icon" /> Filter
        </button>
        <button
          type="button"
          className="sort-trigger-btn"
          onClick={() => setOpen(true)}
        >
          Sort by
        </button>
        {open && (
          <div
            className="sort-overlay"
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <div
              className="sort-dropdown-sheet"
              onClick={(e) => e.stopPropagation()}
            >
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`sort-option ${selected === option ? "active" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

export default FilterCom;
