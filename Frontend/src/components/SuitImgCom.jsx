import React, { useRef, useState } from "react";

const SuitImgCom = ({ files = [] }) => {
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleEnd = (e) => {
    if (!isDragging.current) return;

    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

    const diff = startX.current - endX;

    if (diff > 50 && current < files.length - 1) {
      setCurrent(current + 1);
    } else if (diff < -50 && current > 0) {
      setCurrent(current - 1);
    }

    isDragging.current = false;
  };

  return (
    <>
      <div
        className="saree-slider-wrapper"
        ref={sliderRef}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
      >
        <div
          className="saree-slider-track"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {files.map((file, index) => (
            <div key={index} className="saree-slider-image">
              {file.mediaType === "video" ? (
                <video
                  src={file.url}
                  className="saree-slider-video story-video"
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <img
                  src={file.url}
                  alt={`Suit view ${index + 1}`}
                  className="saree-slider-image"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="saree-slider-dots">
        {files.map((_, index) => (
          <span
            key={index}
            className={`saree-slider-dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </>
  );
};

export default SuitImgCom;
