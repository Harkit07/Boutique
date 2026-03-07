import React, { useContext, useState } from "react";
import "../styles/MenuCom.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { UserDataContext } from "../context/UserContext";

const CategoriesDrawer = ({
  isOpen,
  isCategoriesOpen,
  setIsCategoriesOpen,
  setIsOpen,
}) => {
  const closeCatCol = () => {
    setIsCategoriesOpen(false);
  };

  const { filterSuitsByCategory } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setIsCategoriesOpen(false);
    setIsOpen(false);

    // Filter suits locally
    filterSuitsByCategory(category);

    // Update URL (optional)
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    "All",
    "Handwork",
    "Machine Work",
    "AARI Work",
    "Punjabi Baby Dress",
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`ba-mobile-menu-overlay ${isOpen ? "overlay-show" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Drawer */}
      <div
        className={`ba-mobile-col-drawer ${
          isCategoriesOpen
            ? "collections-drawer--active"
            : "collections-drawer--hidden"
        }`}
      >
        <div className="ba-collection-header">
          <span onClick={closeCatCol}>
            <KeyboardArrowLeftIcon className="cut-btn-col" /> Categories
          </span>
          <span onClick={() => setIsOpen(false)}>
            <CloseIcon className="cut-btn-col" />
          </span>
        </div>
        <ul className="ba-menu-list">
          {categories.map((cat) => (
            <li key={cat} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoriesDrawer;
