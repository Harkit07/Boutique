import React from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { UserDataContext } from "../context/UserContext";
import "../styles/Policy.css";

const Policy = () => {
  const { setActiveTab } = React.useContext(UserDataContext);

  return (
    <>
      <HeaderCom />

      <section className="policy-section">
        <div className="policy-card">
          <h1 className="policy-title">Policies</h1>
          <p className="policy-subtitle">
            Ravneet Boutique – Transparency & Customer Care
          </p>

          <div className="policy-divider"></div>

          {/* Privacy Policy */}
          <div className="policy-block">
            <h2>Privacy Policy</h2>
            <p>
              At Ravneet Boutique, we respect your privacy. Any personal
              information you share with us such as name, contact details, and
              address is used only to process your orders and improve your
              shopping experience.
            </p>
            <p>
              We do not sell or share your personal information with third
              parties without your consent.
            </p>
          </div>

          {/* Shipping Policy */}
          <div className="policy-block">
            <h2>Shipping Policy</h2>
            <ul>
              <li>📦 Orders are processed within 1-3 business days.</li>
              <li>🚚 Delivery time usually takes 4-7 business days.</li>
              <li>📍 Delivery time may vary depending on your location.</li>
              <li>
                📩 Customers will receive updates once the order is shipped.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav activeTab={"account"} setActiveTab={setActiveTab} />
    </>
  );
};

export default Policy;
