import React, { useContext, useState } from "react";
import "../styles/FilterCom.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { UserDataContext } from "../context/UserContext";

// Lifted to module scope to avoid reference recreation on every render
const FILTER_OPTIONS = [
  "All",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];

const FilterCom = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Featured");
  const { setSortType, filterSuitsByCategory } = useContext(UserDataContext);

  const handleSelect = (option) => {
    setSelected(option);
    if (option === "All") {
      setSortType("");
      filterSuitsByCategory("All");
    } else {
      setSortType(option);
    }
    setOpen(false);
  };

  return (
    <section className="product-toolbar-ux">
      <div className="product-toolbar-left">
        <button type="button" className="toolbar-filter-btn">
          <FilterAltIcon className="filter-icon" />
          Filter
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
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
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
};

export default FilterCom;
