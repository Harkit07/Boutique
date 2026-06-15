import React, { memo } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { useAuth } from "../context/MyContext";
import "../styles/Policy.css";
import Skeleton from "../components/Skeleton";
import PrivacyPolicy from "../components/PrivacyPolicy";

const Policy = memo(() => {
  const { loading } = useAuth();

  if (loading) return <Skeleton />;

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
          <div className="policy-block">
            <PrivacyPolicy />
          </div>
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
      <BottomNav activeTab="account" />
    </>
  );
});

export default Policy;
