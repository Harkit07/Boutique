import React, { memo } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { useAuth } from "../context/MyContext";
import "../styles/Policy.css";
import { Skeleton as BoneyardSkeleton } from "boneyard-js/react";
import { useBoneyard } from "../utils/boneyard";
import PrivacyPolicy from "../components/PrivacyPolicy";

const ReturnPolicy = memo(() => {
  const { loading } = useAuth();
  const isBoneyard = useBoneyard();

  return (
    <BoneyardSkeleton name="return-policy-page" loading={loading || isBoneyard}>
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
              <h2>Return & Exchange Policy</h2>
              <ul>
                <li>
                  🔁 Returns or exchanges must be requested within 3 days of
                  delivery.
                </li>
                <li>👗 Items must be unused and in original condition.</li>
                <li>🏷️ Tags must remain attached to the product.</li>
                <li>
                  ❌ Customized or discounted items may not be eligible for
                  return.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Footer />
        <BottomNav activeTab="account" />
      </>
    </BoneyardSkeleton>
  );
});

export default ReturnPolicy;
