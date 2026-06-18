import React, { memo } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import "../styles/About.css";
import { Skeleton as BoneyardSkeleton } from "boneyard-js/react";
import { useAuth } from "../context/MyContext";
import { useBoneyard } from "../utils/boneyard";

const About = memo(() => {
  const { loading } = useAuth();
  const isBoneyard = useBoneyard();

  return (
    <BoneyardSkeleton name="about-page" loading={loading || isBoneyard}>
      <>
        <HeaderCom />
        <section className="about-section">
          <div className="about-card">
            <div className="about-logo-wrapper">
              <img src="/logo.jpg" alt="Ravneet Boutique Logo" />
            </div>
            <h1 className="about-title">Ravneet Boutique</h1>
            <p className="about-tagline">Where Elegance Meets Individuality</p>
            <div className="about-divider"></div>
            <p className="about-description">
              Ravneet Boutique was founded with a passion for timeless fashion
              and modern elegance. Every piece is thoughtfully curated to bring
              confidence, grace, and sophistication into your wardrobe.
            </p>
            <p className="about-description">
              Led by <span className="highlight">Khush Sran</span>, our boutique
              celebrates individuality and empowers women to express their
              unique style effortlessly.
            </p>
            <div className="mission-box">
              <h3>Our Promise</h3>
              <ul>
                <li>✨ Premium Quality & Craftsmanship</li>
                <li>🌸 Elegant & Trendy Designs</li>
                <li>💖 Personalized Customer Experience</li>
                <li>👗 Fashion That Inspires Confidence</li>
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

export default About;
