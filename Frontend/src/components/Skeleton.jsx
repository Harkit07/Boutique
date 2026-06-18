import React from "react";
import "../styles/Skeleton.css";

function Skeleton() {
  return (
    <div className="skeleton-wrapper">
      {/* Header */}
      <div className="skeleton-header">
        <div className="skeleton-item skeleton-icon"></div>
        <div className="skeleton-item skeleton-logo"></div>
        <div className="skeleton-item skeleton-icon"></div>
      </div>

      {/* Banner */}
      <div className="skeleton-item skeleton-banner"></div>

      {/* Dress the Moment (Category Grid) */}
      <div
        className="skeleton-title skeleton-item"
        style={{ width: "280px" }}
      ></div>
      <div className="skeleton-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-item skeleton-img"></div>
            <div className="skeleton-item skeleton-text"></div>
          </div>
        ))}
      </div>

      {/* Best Sellers (Product Grid) */}
      <div
        className="skeleton-title skeleton-item"
        style={{ width: "220px" }}
      ></div>
      <div className="skeleton-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-item skeleton-img"></div>
            <div className="skeleton-item skeleton-text"></div>
            <div className="skeleton-item skeleton-text short"></div>
            <div className="skeleton-item skeleton-text long"></div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="skeleton-bottom-nav">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-item skeleton-nav-item"></div>
        ))}
      </div>
    </div>
  );
}

export default Skeleton;
