import React, { useRef, useState, useEffect, useCallback } from "react";

const SuitImgCom = ({ files = [] }) => {
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // Zoom & pan state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Refs for gesture tracking
  const containerRef = useRef(null);
  const lastPan = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  // Swipe tracking (only when not zoomed)
  const swipeStart = useRef(null);

  // Pinch tracking
  const lastPinchDist = useRef(null);
  const lastPinchMid = useRef(null);

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

  // ── helpers ──────────────────────────────────────────────
  const clampPan = useCallback((x, y, currentScale, el) => {
    if (!el || currentScale <= 1) return { x: 0, y: 0 };
    const maxX = (el.offsetWidth * (currentScale - 1)) / 2;
    const maxY = (el.offsetHeight * (currentScale - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback(
    (idx) => {
      setCurrent(idx);
      resetZoom();
    },
    [resetZoom],
  );

  // ── Desktop: wheel to zoom ────────────────────────────────
  const handleWheel = useCallback(
    (e) => {
      if (!e.ctrlKey && scale <= 1) return;

      e.preventDefault();
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      setScale((prev) => {
        const next = Math.min(
          4,
          Math.max(1, prev * (e.deltaY < 0 ? 1.1 : 0.9)),
        );
        if (next === 1) {
          setPan({ x: 0, y: 0 });
        } else {
          setPan((p) => {
            const ratio = next / prev;
            const nx = mouseX - (mouseX - p.x) * ratio;
            const ny = mouseY - (mouseY - p.y) * ratio;
            return clampPan(nx, ny, next, el);
          });
        }
        return next;
      });
    },
    [scale, clampPan],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (!e.ctrlKey && scale <= 1) return;
      e.preventDefault();

      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      setScale((prev) => {
        const next = Math.min(
          4,
          Math.max(1, prev * (e.deltaY < 0 ? 1.1 : 0.9)),
        );
        if (next === 1) {
          setPan({ x: 0, y: 0 });
        } else {
          setPan((p) => {
            const ratio = next / prev;
            const nx = mouseX - (mouseX - p.x) * ratio;
            const ny = mouseY - (mouseY - p.y) * ratio;
            return clampPan(nx, ny, next, el);
          });
        }
        return next;
      });
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault(); // block page zoom during pinch
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (lastPinchDist.current !== null) {
          const rect = el.getBoundingClientRect();
          const pinchX =
            (e.touches[0].clientX + e.touches[1].clientX) / 2 -
            rect.left -
            rect.width / 2;
          const pinchY =
            (e.touches[0].clientY + e.touches[1].clientY) / 2 -
            rect.top -
            rect.height / 2;
          const ratio = dist / lastPinchDist.current;

          setScale((prev) => {
            const next = Math.min(4, Math.max(1, prev * ratio));
            if (next === 1) {
              setPan({ x: 0, y: 0 });
            } else {
              setPan((p) => {
                const nx = pinchX - (pinchX - p.x) * (next / prev);
                const ny = pinchY - (pinchY - p.y) * (next / prev);
                return clampPan(nx, ny, next, el);
              });
            }
            return next;
          });
        }
        lastPinchDist.current = dist;
      } else if (e.touches.length === 1 && isPanning.current) {
        e.preventDefault(); // block page scroll while panning zoomed image
        const nx = e.touches[0].clientX - panStart.current.x;
        const ny = e.touches[0].clientY - panStart.current.y;
        setPan(clampPan(nx, ny, scale, el));
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [scale, clampPan]);

  // ── Desktop: double-click to zoom in/out ──────────────────
  const handleDblClick = useCallback(
    (e) => {
      const el = containerRef.current;
      if (!el) return;
      if (scale > 1) {
        resetZoom();
        return;
      }
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      const next = 2.5;
      const np = clampPan(-mx * (next - 1), -my * (next - 1), next, el);
      setScale(next);
      setPan(np);
    },
    [scale, resetZoom, clampPan],
  );

  // ── Desktop: drag to pan ──────────────────────────────────
  const handleMouseDown = useCallback(
    (e) => {
      if (scale <= 1) {
        // track swipe for slide change
        swipeStart.current = { x: e.clientX };
        return;
      }
      e.preventDefault();
      isPanning.current = true;
      panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    },
    [scale, pan],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isPanning.current) return;
      const el = containerRef.current;
      const nx = e.clientX - panStart.current.x;
      const ny = e.clientY - panStart.current.y;
      setPan(clampPan(nx, ny, scale, el));
    },
    [scale, clampPan],
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (scale <= 1 && swipeStart.current) {
        const diff = swipeStart.current.x - e.clientX;
        if (diff > 50 && current < files.length - 1) goTo(current + 1);
        else if (diff < -50 && current > 0) goTo(current - 1);
        swipeStart.current = null;
      }
      isPanning.current = false;
    },
    [scale, current, files.length, goTo],
  );

  // ── Mobile: touch gestures ────────────────────────────────
  const handleTouchStart = useCallback(
    (e) => {
      if (e.touches.length === 1) {
        swipeStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        if (scale > 1) {
          isPanning.current = true;
          panStart.current = {
            x: e.touches[0].clientX - pan.x,
            y: e.touches[0].clientY - pan.y,
          };
        }
        lastPinchDist.current = null;
      } else if (e.touches.length === 2) {
        isPanning.current = false;
        swipeStart.current = null;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist.current = Math.sqrt(dx * dx + dy * dy);
        lastPinchMid.current = {
          x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
          y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        };
      }
    },
    [scale, pan],
  );

  const handleTouchEnd = useCallback(
    (e) => {
      lastPinchDist.current = null;
      isPanning.current = false;

      // swipe to next/prev only when not zoomed
      if (scale <= 1 && swipeStart.current && e.changedTouches.length === 1) {
        const diff = swipeStart.current.x - e.changedTouches[0].clientX;
        if (diff > 50 && current < files.length - 1) goTo(current + 1);
        else if (diff < -50 && current > 0) goTo(current - 1);
      }
      swipeStart.current = null;
    },
    [scale, current, files.length, goTo],
  );

  // ── Mobile: double-tap to zoom ────────────────────────────
  const lastTap = useRef(0);
  const handleTouchEndDbl = useCallback(
    (e) => {
      handleTouchEnd(e);
      const now = Date.now();
      if (now - lastTap.current < 300) {
        const el = containerRef.current;
        if (!el) return;
        if (scale > 1) {
          resetZoom();
        } else {
          const rect = el.getBoundingClientRect();
          const tx = e.changedTouches[0].clientX - rect.left - rect.width / 2;
          const ty = e.changedTouches[0].clientY - rect.top - rect.height / 2;
          const next = 2.5;
          setScale(next);
          setPan(clampPan(-tx * (next - 1), -ty * (next - 1), next, el));
        }
      }
      lastTap.current = now;
    },
    [scale, resetZoom, clampPan, handleTouchEnd],
  );

  const isZoomed = scale > 1;

  return (
    <>
      {/* Zoom indicator */}
      {isZoomed && (
        <div style={zoomBadgeStyle}>
          {Math.round(scale * 100)}%
          <button onClick={resetZoom} style={resetBtnStyle}>
            ✕ Reset
          </button>
        </div>
      )}

      {/* Slider wrapper */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          ref={containerRef}
          className="saree-slider-wrapper"
          style={{
            cursor: isZoomed ? "grab" : "zoom-in",
            touchAction: isZoomed ? "none" : "pan-y",
            userSelect: "none",
          }}
          onDoubleClick={handleDblClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEndDbl}
        >
          <div
            className="saree-slider-track"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: isZoomed ? "none" : "transform 0.3s ease",
            }}
          >
            {files.map((file, index) => (
              <div
                key={index}
                className="saree-slider-image"
                style={{ overflow: "hidden" }}
              >
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
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      pointerEvents: "none",
                      transform:
                        index === current
                          ? `scale(${scale}) translate(${pan.x / scale}px, ${pan.y / scale}px)`
                          : "none",
                      transition: isPanning.current
                        ? "none"
                        : "transform 0.2s ease",
                      willChange: "transform",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Prev / Next arrows — hidden when zoomed */}
        {!isZoomed && current > 0 && (
          <button
            style={{ ...arrowStyle, left: 8 }}
            onClick={() => goTo(current - 1)}
          >
            ‹
          </button>
        )}
        {!isZoomed && current < files.length - 1 && (
          <button
            style={{ ...arrowStyle, right: 8 }}
            onClick={() => goTo(current + 1)}
          >
            ›
          </button>
        )}
      </div>

      {/* Dots */}
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

const zoomBadgeStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 10,
  background: "rgba(0,0,0,0.55)",
  color: "#fff",
  fontSize: 12,
  padding: "4px 10px",
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const resetBtnStyle = {
  background: "rgba(255,255,255,0.2)",
  border: "none",
  color: "#fff",
  fontSize: 11,
  borderRadius: 12,
  padding: "2px 7px",
  cursor: "pointer",
};

const arrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.35)",
  border: "none",
  color: "#fff",
  fontSize: 28,
  width: 36,
  height: 36,
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 5,
};

export default SuitImgCom;
