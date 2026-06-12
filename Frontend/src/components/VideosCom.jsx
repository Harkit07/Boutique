import React, { useContextEffect, useRef, useContext, useEffect } from "react";
import "../styles/VideosCom.css";
import { UserDataContext } from "../context/UserContext";

const LazyVideo = ({ src, name = "Video content" }) => {
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
      className="story-video"
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`Video highlight for ${name}`}
    />
  );
};

const VideosCom = () => {
  const sliderRef = useRef(null);
  const { allSuit } = useContext(UserDataContext);

  // Converted chained array processing iterations into a unified processing execution pass
  const videoFiles = [];
  for (const suit of allSuit) {
    if (videoFiles.length >= 4) break;
    if (suit.file) {
      for (const file of suit.file) {
        if (file.mediaType === "video") {
          videoFiles.push(file);
          if (videoFiles.length >= 4) break;
        }
      }
    }
  }

  return (
    <section className="real-stories-section">
      <h2 className="stories-heading">
        Real voices. Real looks.
        <br />
        Real stories.
      </h2>
      <div className="stories-slider" ref={sliderRef}>
        {videoFiles.map((video, index) => (
          <div className="story-card" key={video.url || index}>
            <LazyVideo
              src={video.url}
              name={video.title || `Story element ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideosCom;
