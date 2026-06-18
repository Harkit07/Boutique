import React, { memo } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { useAuth } from "../context/MyContext";
import "../styles/Policy.css";
import { Skeleton as BoneyardSkeleton } from "boneyard-js/react";
import { useBoneyard } from "../utils/boneyard";
import PrivacyPolicy from "../components/PrivacyPolicy";

const TermConditions = memo(() => {
  const { loading } = useAuth();
  const isBoneyard = useBoneyard();

  return (
    <BoneyardSkeleton name="terms-page" loading={loading || isBoneyard}>
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
              <h2>Terms & Conditions</h2>
              <p>
                By purchasing from Ravneet Boutique, you agree to our policies
                regarding shipping, returns, and payments. We reserve the right
                to update these policies at any time to improve our services.
              </p>
            </div>
          </div>
        </section>
        <Footer />
        <BottomNav activeTab="account" />
      </>
    </BoneyardSkeleton>
  );
});

export default TermConditions;
