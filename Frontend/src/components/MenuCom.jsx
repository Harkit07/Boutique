import React, { useContext, useState   } from "react";
import "../styles/MenuCom.css";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CategoriesDrawer from "./CategoriesDrawer";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const MenuCom = ({ isOpen, setIsOpen }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { user } = useContext(UserDataContext);

  return (
    <>
      <button
        type="button"
        className={`ba-mobile-menu-overlay ${isOpen ? "overlay-show" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
      />

      <div className={`ba-mobile-menu-drawer ${isOpen ? "menu-open" : ""}`}>
        <div className="ba-menu-header">
          <span>Menu</span>
          <button
            type="button"
            className="ba-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon className="cut-btn" />
          </button>
        </div>

        <ul className="ba-menu-list">
          <li>
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="ba-list-more">
            <button
              type="button"
              className="ba-collections-btn"
              onClick={() => setIsCategoriesOpen(true)}
            >
              <span>
                Collections <span className="sale-badge">SALE</span>
              </span>
              <NavigateNextIcon />
            </button>
          </li>
          {isCategoriesOpen && (
            <CategoriesDrawer
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isCategoriesOpen={isCategoriesOpen}
              setIsCategoriesOpen={setIsCategoriesOpen}
            />
          )}
          <li>
            <Link
              to="/about"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
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
            <>
              <li id="ba-menu-footer">
                <Link
                  to="/account"
                  className="nav-link ba-user-link"
                  onClick={() => setIsOpen(false)}
                >
                  <PersonIcon id="ba-person-icon" />
                  {`${user.fullname.firstname} ${user.fullname.lastname}`}
                </Link>
              </li>
              <li id="ba-menu-footer">
                <Link
                  to="/logout"
                  className="nav-link ba-user-link"
                  onClick={() => setIsOpen(false)}
                >
                  <PersonIcon id="ba-person-icon" />
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <li id="ba-menu-footer">
              <Link to="/login" className="nav-link ba-user-link">
                <PersonIcon id="ba-person-icon" />
                Register/Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default MenuCom;
