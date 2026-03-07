import React, { useRef } from "react";
import "../styles/VideosCom.css";
import { UserDataContext } from "../context/UserContext";

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
            <video
              className="story-video"
              src={video.url}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideosCom;
