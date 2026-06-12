import React, { useContext, useEffect, useRef } from "react";
import "../styles/ImageCom.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Plays video ONLY when it enters the viewport
const LazyVideo = ({ src, name = "Product variant" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="data-card-img"
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`Video demonstration of ${name}`}
    />
  );
};

const DataCard = ({
  id,
  category,
  name,
  price,
  image,
  preOrder,
  mediaType,
}) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="data-card"
      onClick={() => navigate(`/suit/${id}`)}
    >
      <div className="data-card-img-wrapper">
        {preOrder && <span className="data-card-preorder">Pre-Order</span>}
        {mediaType === "video" ? (
          <LazyVideo src={image} name={name} />
        ) : (
          <img
            src={image || "Suit IMG"}
            alt={name || "Suit IMG"}
            className="data-card-img"
            loading="lazy"
          />
        )}
        <span className="data-card-wishlist">
          <ShoppingBagIcon
            className="hover"
            style={{ background: "transparent" }}
          />
        </span>
      </div>
      <div className="data-card-title">
        <div className="data-card-name">{name}</div>
        <div className="data-card-sku">| {category}</div>
      </div>
      <div className="data-card-price">Rs. {price.toLocaleString()}.00</div>
    </button>
  );
};

const DataGrid = () => {
  const { filteredSuit } = useContext(UserDataContext);

  if (filteredSuit.length === 0) {
    return (
      <div className="data-card-grid">
        <h2>No Suit Yet</h2>
      </div>
    );
  }

  const isOdd = filteredSuit.length % 2 !== 0;

  return (
    <div className="data-card-grid">
      {filteredSuit.map((suit) => (
        <DataCard
          key={suit._id}
          id={suit._id}
          name={suit.name}
          description={suit.description}
          category={suit.category}
          price={suit.price}
          image={suit.file?.[0]?.url}
          mediaType={suit.file?.[0]?.mediaType}
        />
      ))}
      {isOdd && <div className="data-card"></div>}
    </div>
  );
};

export default DataGrid;
