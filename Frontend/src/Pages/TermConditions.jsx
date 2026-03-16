import React from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { UserDataContext } from "../context/UserContext";
import "../styles/Policy.css";
import Skeleton from "../components/Skeleton";

const TermConditions = () => {
  const { setActiveTab, loading } = React.useContext(UserDataContext);

  if (loading) {
    return <Skeleton />;
  }

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

          {/* Terms */}
          <div className="policy-block">
            <h2>Terms & Conditions</h2>
            <p>
              By purchasing from Ravneet Boutique, you agree to our policies
              regarding shipping, returns, and payments. We reserve the right to
              update these policies at any time to improve our services.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav activeTab={"account"} setActiveTab={setActiveTab} />
    </>
  );
};

export default TermConditions;
