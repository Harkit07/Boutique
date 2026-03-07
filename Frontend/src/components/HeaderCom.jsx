import "../styles/Header.css";
import logo from "../assets/logo.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import MenuCom from "./MenuCom";
import { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="menu box">
        <MenuIcon className="menu-icon hover" onClick={() => setIsOpen(true)} />
        <MenuCom isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="logo box">
        <Link to="/" className="nav-link">
          <img src={logo} alt="Image" />
        </Link>
      </div>
      <div className="icons box">
        {/* <SearchIcon className="hover" /> */}
        <Link to="/cart" className="nav-link">
          <ShoppingBagIcon className="hover" />
        </Link>
      </div>
    </header>
  );
};

export default Menu;
