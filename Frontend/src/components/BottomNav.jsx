import React from "react";
import "../styles/BottomNav.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const BottomNav = ({ activeTab, setActiveTab }) => {
  const { user } = React.useContext(UserDataContext);
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon />,
    },
    {
      id: "account",
      label: "Account",
      icon: <PersonIcon />,
    },
    {
      id: "shop",
      label: "Shop",
      icon: <StorefrontIcon />,
    },
    {
      id: "cart",
      label: "Cart",
      icon: <ShoppingBagIcon />,
      badge: user ? user.cart.length : 0,
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={`/${item.id}`}
          className={`nav-item nav-link ${activeTab === item.id ? "active" : ""}`}
          onClick={() => setActiveTab(item.id)}
        >
          <div className="nav-icon-wrapper">
            {item.icon}
            {item.badge !== undefined && (
              <span className="badge">{item.badge}</span>
            )}
          </div>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
