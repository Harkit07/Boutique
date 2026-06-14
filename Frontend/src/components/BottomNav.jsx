import React, { memo } from "react";
import "../styles/BottomNav.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import { useAuth } from "../context/MyContext";

const BottomNav = memo(({ activeTab }) => {
  const { user } = useAuth();
  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon />, to: "/home" },
    { id: "account", label: "Account", icon: <PersonIcon />, to: "/account" },
    { id: "shop", label: "Shop", icon: <StorefrontIcon />, to: "/shop" },
    {
      id: "cart",
      label: "Cart",
      icon: <ShoppingBagIcon />,
      badge: user?.cart?.length ?? 0,
      to: "/cart",
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className={`nav-item nav-link ${activeTab === item.id ? "active" : ""}`}
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
});

export default BottomNav;
