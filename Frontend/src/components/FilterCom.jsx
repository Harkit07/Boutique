import React, { useState } from "react";
import "../styles/FilterCom.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { UserDataContext } from "../context/UserContext";

const FilterCom = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Featured");
  const { setSortType } = React.useContext(UserDataContext);

  const options = [
    "All",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date, old to new",
    "Date, new to old",
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setSortType(option === "All" ? "" : option);
    setOpen(false);
    // 👉 trigger sorting logic here
  };

  return (
    <section className="product-toolbar-ux">
      <div className="product-toolbar-left">
        <button className="toolbar-filter-btn">
          <FilterAltIcon className="filter-icon" />
          Filter
        </button>

        <button className="sort-trigger-btn" onClick={() => setOpen(true)}>
          Sort by
        </button>
        {open && (
          <div className="sort-overlay" onClick={() => setOpen(false)}>
            <div
              className="sort-dropdown-sheet"
              onClick={(e) => e.stopPropagation()}
            >
              {options.map((option) => (
                <div
                  key={option}
                  className={`sort-option ${
                    selected === option ? "active" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterCom;
