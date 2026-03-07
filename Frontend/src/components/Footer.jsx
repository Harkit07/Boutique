import React, { useState } from "react";
import "../styles/Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", path: "/" },
      { label: "Shop", path: "/shop" },
      {
        label: "Contact",
        external: "https://ig.me/m/ravneet_boutique9783?text=Hi",
      },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", path: "/policy" },
      { label: "Terms of Service", path: "/termandconditions" },
      { label: "Return Policy", path: "/returnpolicy" },
    ],
  },
  {
    title: "Best Sellers",
    links: [
      { label: "Sarees", path: "#" },
      { label: "Lehengas", path: "#" },
      { label: "Kurtas", path: "#" },
    ],
  },
];

const Footer = () => {
  const [open, setOpen] = useState([false, false, false]);

  const toggleSection = (idx) => {
    setOpen((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <footer className="custom-footer">
      <div className="footer-logo-block">
        <div className="logo-img">
          <span className="logo-circle">
            <img src={logo} alt="Logo" />
          </span>
          <div className="logo-text">Ravneet Boutique</div>
        </div>
        <div className="footer-address">
          Ravneet Boutique Pvt. Ltd.
          <br />
          Ward no.3
          <br />
          Hansliya
          <br />
          Pilibangan 335803
          <br />
          Hanumangarh
        </div>
        <div className="footer-socials">
          <a
            href="https://www.facebook.com/khush.sran.7374"
            aria-label="Facebook"
            className="footer-social hover"
            target="_blank"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/ravneet_boutique9783"
            aria-label="Instagram"
            className="footer-social hover"
            target="_blank"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
      <div className="footer-sections">
        {sections.map((section, idx) => (
          <div key={section.title} className="footer-section">
            <button
              className="footer-section-header"
              onClick={() => toggleSection(idx)}
              aria-expanded={open[idx]}
            >
              <span>{section.title}</span>
              <span className="footer-section-toggle">
                {open[idx] ? "−" : "+"}
              </span>
            </button>
            {open[idx] && (
              <ul className="footer-section-links">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.external}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.path}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <button
          className="footer-backtotop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
        <span className="footer-copyright">
          © {new Date().getFullYear()} Ravneet Boutique. All rights reserved.
        </span>
      </div>
      <a
        href="https://wa.me/919999999999"
        className="footer-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <span>🟢</span>
      </a>
    </footer>
  );
};

export default Footer;
