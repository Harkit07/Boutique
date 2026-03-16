import React, { useEffect, useRef } from "react";
import "../styles/VideosCom.css";
import { UserDataContext } from "../context/UserContext";

// Plays video ONLY when it enters the viewport
const LazyVideo = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // play when visible
        } else {
          video.pause(); // pause when scrolled away
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
      preload="none" // don't download until visible
    />
  );
};

const VideosCom = () => {
  const sliderRef = useRef(null);
  const { allSuit } = React.useContext(UserDataContext);

  const videoFiles = allSuit
    .flatMap((suit) => suit.file || [])
    .filter((file) => file.mediaType === "video")
    .slice(0, 4);

  return (
    <section className="real-stories-section">
      <h2 className="stories-heading">
        Real voices. Real looks.
        <br />
        Real stories.
      </h2>
      <div className="stories-slider" ref={sliderRef}>
        {videoFiles.map((video, index) => (
          <div className="story-card" key={index}>
            <LazyVideo src={video.url} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideosCom;
