import React from "react";
import "../styles/Skeleton.css";

function Skeleton() {
  return (
    <div className="rxo-skeleton-wrapper">
      {/* Header skeleton */}
      <div className="rxo-skeleton-header">
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-logo"></div>
        <div className="rxo-skeleton-cart"></div>
      </div>

      {/* Banner skeleton */}
      <div className="rxo-skeleton-banner"></div>

      {/* Category grid skeleton (4 cards) */}
      <div className="rxo-skeleton-category-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rxo-skeleton-category-card"></div>
        ))}
      </div>

      {/* Product grid skeleton (4 cards) */}
      <div className="rxo-skeleton-product-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rxo-skeleton-product-card"></div>
        ))}
      </div>

      {/* Bottom nav skeleton */}
      <div className="rxo-skeleton-nav">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rxo-skeleton-menu"></div>
        ))}
      </div>
    </div>
  );
}

export default Skeleton;
