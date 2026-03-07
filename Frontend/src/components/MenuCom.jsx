import React, { useState } from "react";
import "../styles/MenuCom.css";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CategoriesDrawer from "./CategoriesDrawer";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const MenuCom = ({ isOpen, setIsOpen }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { user, setActiveTab } = React.useContext(UserDataContext);

  return (
    <>
      {/* Overlay */}
      <div
        className={`ba-mobile-menu-overlay ${isOpen ? "overlay-show" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Drawer */}
      <div className={`ba-mobile-menu-drawer ${isOpen ? "menu-open" : ""}`}>
        <div className="ba-menu-header">
          <span>Menu</span>
          <span onClick={() => setIsOpen(false)}>
            <CloseIcon className="cut-btn" />
          </span>
        </div>

        <ul className="ba-menu-list">
          <li>Home</li>
          <li
            className="ba-list-more"
            onClick={() => setIsCategoriesOpen(true)}
          >
            <span>
              Collections <span className="sale-badge">SALE</span>
            </span>
            <NavigateNextIcon />
          </li>

          {isCategoriesOpen ? (
            <CategoriesDrawer
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isCategoriesOpen={isCategoriesOpen}
              setIsCategoriesOpen={setIsCategoriesOpen}
            />
          ) : null}
          <li onClick={() => setIsOpen(false)}>
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li>
            <a
              href="https://ig.me/m/ravneet_boutique9783?text=Hi"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </a>
          </li>
          {user != null ? (
            <Link to="/account" className="nav-link">
              <li id="ba-menu-footer">
                <PersonIcon id="ba-person-icon" />
                {`${user.fullname.firstname} ${user.fullname.lastname}`}
              </li>
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              <li id="ba-menu-footer">
                <PersonIcon id="ba-person-icon" />
                Register/Login
              </li>
            </Link>
          )}

          <Link to="/logout" className="nav-link">
            <li id="ba-menu-footer">
              <PersonIcon id="ba-person-icon" />
              Log Out
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default MenuCom;
