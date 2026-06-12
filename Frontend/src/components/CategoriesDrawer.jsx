import React, { useContext  } from "react";
import "../styles/MenuCom.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { UserDataContext } from "../context/UserContext";

const CATEGORIES = [
  "All",
  "Handwork",
  "Machine Work",
  "AARI Work",
  "Punjabi Baby Dress",
];

const overlayButtonStyle = {
  background: "transparent",
  border: "none",
  width: "100%",
  height: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 999,
};

const CategoriesDrawer = ({
  isOpen,
  isCategoriesOpen,
  setIsCategoriesOpen,
  setIsOpen,
}) => {
  const closeCatCol = () => setIsCategoriesOpen(false);
  const { filterSuitsByCategory } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setIsCategoriesOpen(false);
    setIsOpen(false);
    filterSuitsByCategory(category);
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  // Keyboard handler for the overlay button
  const handleOverlayKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay  */}
      <button
        type="button"
        className={`ba-mobile-menu-overlay ${isOpen ? "overlay-show" : ""}`}
        onClick={() => setIsOpen(false)}
        onKeyDown={handleOverlayKeyDown}
        aria-label="Close menu"
        style={overlayButtonStyle}
      />

      <div
        className={`ba-mobile-col-drawer ${
          isCategoriesOpen
            ? "collections-drawer--active"
            : "collections-drawer--hidden"
        }`}
      >
        <div className="ba-collection-header">
          <button
            type="button"
            className="ba-header-back-btn"
            onClick={closeCatCol}
            aria-label="Back to menu"
          >
            <KeyboardArrowLeftIcon className="cut-btn-col" /> Categories
          </button>
          <button
            type="button"
            className="ba-header-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon className="cut-btn-col" />
          </button>
        </div>
        <ul className="ba-menu-list">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                className="ba-category-btn"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoriesDrawer;



