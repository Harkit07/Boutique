import "../styles/Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import MenuCom from "./MenuCom";
import { useState } from "react";
import { useAuth } from "../context/MyContext";

const HeaderCom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="header">
      {/* Hamburger – visible only on mobile */}
      <div className="menu-box">
        <MenuIcon className="menu-icon hover" onClick={() => setIsOpen(true)} />
        <MenuCom isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Desktop Navigation – hidden on mobile */}
      <nav className="desktop-nav">
        <Link to="/about" className="nav-link">
          About
        </Link>
        <a
          href="https://ig.me/m/ravneet_boutique9783?text=Hi"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          Contact
        </a>
        {user ? (
          <>
            <Link to="/account" className="nav-link">
              Account
            </Link>
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </nav>

      {/* Logo – centered */}
      <div className="logo-box">
        <Link to="/" className="nav-link">
          <img src="/logo.jpg" alt="Ravneet Boutique Logo" />
        </Link>
      </div>

      {/* Right icons: Cart (and maybe search) */}
      <div className="icons-box">
        <Link to="/cart" className="nav-link">
          <ShoppingBagIcon className="hover" />
        </Link>
      </div>
    </header>
  );
};

export default HeaderCom;
