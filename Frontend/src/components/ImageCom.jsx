import React, { useEffect, useRef, memo } from "react";
import "../styles/ImageCom.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useFilter } from "../context/MyContext";
import { useNavigate } from "react-router-dom";

const LazyVideo = ({ src, name = "Product variant" }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting ? video.play().catch(() => {}) : video.pause(),
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
    />
  );
};

const DataCard = memo(({ id, category, name, price, image, mediaType }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/suit/${id}`);
  return (
    <button type="button" className="data-card" onClick={handleClick}>
      <div className="data-card-img-wrapper">
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
});

const DataGrid = memo(() => {
  const { filteredSuits } = useFilter();
  if (filteredSuits.length === 0)
    return (
      <div className="data-card-grid">
        <h2>No Suit Yet</h2>
      </div>
    );
  return (
    <div className="data-card-grid">
      {filteredSuits.map((suit) => (
        <DataCard
          key={suit._id}
          id={suit._id}
          name={suit.name}
          category={suit.category}
          price={suit.price}
          image={suit.file?.[0]?.url}
          mediaType={suit.file?.[0]?.mediaType}
        />
      ))}
    </div>
  );
});

export default DataGrid;
