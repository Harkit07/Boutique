import "../styles/Home.css";
import "../styles/ImageCom.css";
import HomeReview from "./HomeReview";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { useSuits, useFilter } from "../context/MyContext";
import VideosCom from "./VideosCom";
import React, { useCallback, useMemo, memo } from "react";

const categoryImageMap = {
  Handwork: "Handwork.jpg",
  "Machine Work": "Machinework.jpg",
  "AARI Work": "AARIwork.jpg",
  All: "dummy1.jpg",
};

const HomeCom = memo(() => {
  const { allSuit, loading } = useSuits();
  const { filterByCategory, filterByPrice } = useFilter();
  const navigate = useNavigate();

  const handleCategoryClick = useCallback(
    (category) => {
      filterByCategory(category);
      navigate(`/shop?category=${encodeURIComponent(category)}`);
    },
    [filterByCategory, navigate],
  );

  const handlePriceClick = useCallback(
    (min, max) => {
      filterByPrice(min, max);
      navigate(max ? `/shop?price=${min}-${max}` : `/shop?price=${min}+`);
    },
    [filterByPrice, navigate],
  );

  const bestSellers = useMemo(
    () =>
      allSuit
        .filter((suit) => suit.file?.[0]?.mediaType === "image")
        .slice(0, 4),
    [allSuit],
  );

  return (
    <div className="home">
      <section className="premium-banner">
        <div className="banner-image">
          <img src="/dummy.png" alt="Premium Collection" />
        </div>
      </section>

      <section className="dress-moment">
        <h2>Dress the Moment</h2>
        <p className="section-subtitle">
          Sarees, sets, and handpicked trends made for joyful celebrations.
        </p>
        <div className="moment-grid">
          {["Handwork", "Machine Work", "AARI Work", "All"].map((cat) => (
            <div
              key={cat}
              className="moment-card"
              onClick={() => handleCategoryClick(cat)}
            >
              <img src={`/${categoryImageMap[cat]}`} alt={cat} loading="lazy" />
              <div className="moment-label">
                {cat === "All" ? "NEW ARRIVALS" : cat.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="best-sellers">
        <h2>Best Sellers</h2>
        <p className="section-subtitle">
          Shop our <span className="highlight">best sellers</span>,{" "}
          <span className="highlight-secondary">top-loved products</span> by
          customers for quality, style, and value!
        </p>
        <div className="data-card-grid">
          {bestSellers.map((suit) => (
            <div
              className="data-card"
              key={suit._id}
              onClick={() => navigate(`/suit/${suit._id}`)}
            >
              <div className="data-card-img-wrapper">
                <img
                  src={suit.file?.[0]?.url}
                  alt={suit.name}
                  className="data-card-img"
                  loading="lazy"
                />
                <span className="data-card-wishlist">
                  <ShoppingBagIcon
                    className="hover"
                    style={{ background: "transparent" }}
                  />
                </span>
              </div>
              <div className="data-card-title">
                <div className="data-card-name">{suit.name}</div>
                <div className="data-card-sku">| {suit.category}</div>
              </div>
              <div className="data-card-price">
                Rs. {suit.price.toLocaleString()}.00
              </div>
            </div>
          ))}
        </div>
        <button
          className="view-all-btn"
          onClick={() => handleCategoryClick("All")}
        >
          View All
        </button>
      </section>

      <VideosCom />

      <section className="categories">
        <div className="categories-grid">
          <div className="category-card">
            <div
              className="category-background"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/2208054521/photo/happy-indian-punjabi-woman-running-in-wheat-agriculture-field-concept-of-celebrating-baisakhi.webp?a=1&b=1&s=612x612&w=0&k=20&c=qyU3g8s9i1Bs31xF2MdfoP9wYoqUJL8fVNdzQMes6l0=')",
              }}
            ></div>
            <div className="category-content">
              <h3 className="category-title">Designs- ₹400 To ₹800</h3>
              <p className="category-description">
                Elevate your style with our mid-range Design collection, priced
                between ₹400 and ₹800.
              </p>
              <button
                className="explore-btn"
                onClick={() => handlePriceClick(400, 800)}
              >
                Explore
              </button>
            </div>
          </div>
          <div className="category-card">
            <div
              className="category-background"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/1012986102/photo/indian-women-portrait-in-nature.jpg?s=612x612&w=0&k=20&c=uOEHhyayDTOi27kPxaF0law88LH566DMUq5STanGDIA=')",
              }}
            ></div>
            <div className="category-content">
              <h3 className="category-title">Design- Upto ₹500</h3>
              <p className="category-description">
                Discover affordable elegance with our Design collection priced
                upto ₹500.
              </p>
              <button
                className="explore-btn"
                onClick={() => handlePriceClick(500, null)}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="inside-ravneet">
        <video
          className="ravneet-background-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/logovideo.mp4" type="video/mp4" />
        </video>
        <div className="inside-ravneet-container">
          <div className="ravneet-text-section">
            <div className="ravneet-icon">✋</div>
            <p className="ravneet-label">Inside Ravneet</p>
            <h2 className="ravneet-title">
              Step Into Our World Of Handpicked Weaves, Curated Colors, And
              Everyday Elegance.
            </h2>
            <button
              className="shop-all-btn"
              onClick={() => handleCategoryClick("All")}
            >
              Shop All
            </button>
          </div>
        </div>
      </section>

      <HomeReview />
    </div>
  );
});

export default HomeCom;
