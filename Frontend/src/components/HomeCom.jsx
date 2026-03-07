import "../styles/Home.css";
import dummy from "../assets/dummy.png";
import logovideo from "../assets/logovideo.mp4";
import HomeReview from "./HomeReview";
import dummy1 from "../assets/dummy1.jpg";
import dummy2 from "../assets/dummy2.jpg";
import dummy3 from "../assets/dummy3.jpg";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import VideosCom from "./VideosCom";
import React from "react";

const Home = () => {
  const { allSuit, filterSuitsByCategory, filterSuitsByPrice } =
    React.useContext(UserDataContext);

  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      name: "Sarees",
      image: dummy1,
    },
    {
      id: 2,
      name: "Salwar Sets",
      image: "https://via.placeholder.com/150/D2B48C/000000?text=Salwar+Sets",
    },
    {
      id: 3,
      name: "Kurtas",
      image: "https://via.placeholder.com/150/CD853F/000000?text=Kurtas",
    },
    {
      id: 4,
      name: "Lehengas",
      image: "https://via.placeholder.com/150/DAA520/000000?text=Lehengas",
    },
    {
      id: 5,
      name: "Dupattas",
      image: "https://via.placeholder.com/150/B8860B/000000?text=Dupattas",
    },
  ];

  return (
    <div className="home">
      {/* Premium Banner Section */}
      <section className="premium-banner">
        <div className="banner-image">
          <img src={dummy} alt="Premium Collection" />
        </div>
      </section>

      {/* Top Collections Section */}
      {/* <section className="top-collections">
        <h2>Top Collections</h2>
        <p className="section-subtitle">
          Curated collections crafted for comfort, tradition, and family
          moments.
        </p>
        <div className="collections-container">
          <div className="collections-carousel">
            {collections.map((collection) => (
              <div key={collection.id} className="collection-card">
                <img
                  src={dummy1}
                  alt={collection.name}
                  className="collection-image"
                />
                <p className="collection-name">{collection.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Dress the Moment Section */}
      <section className="dress-moment">
        <h2>Dress the Moment</h2>
        <p className="section-subtitle">
          Sarees, sets, and handpicked trends made for joyful celebrations.
        </p>
        <div className="moment-grid">
          <div
            className="moment-card"
            onClick={() => {
              filterSuitsByCategory("Handwork");
              navigate(`/shop?category=${encodeURIComponent("Handwork")}`);
            }}
          >
            <img src={dummy1} alt="Best Sellers" />
            <div className="moment-label">HAND WORK</div>
          </div>
          <div
            className="moment-card"
            onClick={() => {
              filterSuitsByCategory("Machine Work");
              navigate(`/shop?category=${encodeURIComponent("Machine Work")}`);
            }}
          >
            <img src={dummy2} alt="Dinu's Collections" />
            <div className="moment-label">MACHINE WORK</div>
          </div>
          <div
            className="moment-card"
            onClick={() => {
              filterSuitsByCategory("AARI Work");
              navigate(`/shop?category=${encodeURIComponent("AARI Work")}`);
            }}
          >
            <img src={dummy1} alt="Premium Collections" />
            <div className="moment-label">AARI WORK</div>
          </div>
          <div
            className="moment-card"
            onClick={() => {
              filterSuitsByCategory("All");
              navigate(`/shop?category=${encodeURIComponent("All")}`);
            }}
          >
            <img src={dummy3} alt="New Arrivals" />
            <div className="moment-label">NEW ARRIVALS</div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers">
        <h2>Best Sellers</h2>
        <p className="section-subtitle">
          Shop our <span className="highlight">best sellers</span>,{" "}
          <span className="highlight-secondary">top-loved products</span> by
          customers for quality, style, and value!
        </p>
        <div className="data-card-grid">
          {allSuit
            .filter((suit) => suit.file?.[0]?.mediaType === "image")
            .slice(0, 4)
            .map((suit) => (
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
          onClick={() => {
            filterSuitsByCategory("All");
            navigate(`/shop?category=${encodeURIComponent("All")}`);
          }}
        >
          View All
        </button>
      </section>
      <VideosCom />

      {/* Categories Section */}
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
                onClick={() => {
                  filterSuitsByPrice(400, 800);
                  navigate("/shop?price=400-800");
                }}
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
                onClick={() => {
                  filterSuitsByPrice(500, null);
                  navigate("/shop?price=500+");
                }}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inside Ravneet Section */}
      <section className="inside-ravneet">
        <video
          className="ravneet-background-video"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        >
          <source src={logovideo} type="video/mp4" />
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
              onClick={() => {
                filterSuitsByCategory("All");
                navigate(`/shop?category=${encodeURIComponent("All")}`);
              }}
            >
              Shop All
            </button>
          </div>
        </div>
      </section>
      <HomeReview />
    </div>
  );
};

export default Home;
