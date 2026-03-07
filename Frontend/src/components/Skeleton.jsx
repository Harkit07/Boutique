import React from "react";
import "../styles/Skeleton.css";

function Skeleton() {
  return (
    <div className="rxo-skeleton-wrapper">
      {/* Header */}
      <div className="rxo-skeleton-header">
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-cart"></div>
      </div>

      {/* Banner */}
      <div className="rxo-skeleton-banner"></div>

      {/* Bottom Nav */}
      <div className="rxo-skeleton-nav">
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
      </div>
    </div>
  );
}

export default Skeleton;
