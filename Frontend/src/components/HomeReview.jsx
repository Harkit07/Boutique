import React, { useEffect, useReducer, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import "../styles/HomeReview.css";
import axios from "axios";

// Custom hook to fetch reviews using react-query
const useFeaturedReviews = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featuredReviews"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/suits/featured-reviews`,
      );
      return response.data.homeReviews || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  return { reviews: data || [], loading: isLoading };
};

const initialState = { currentIndex: 0, isTransitioning: false };

function reviewReducer(state, action) {
  switch (action.type) {
    case "GOTO":
      return { currentIndex: action.index, isTransitioning: true };
    case "TRANSITION_DONE":
      return { ...state, isTransitioning: false };
    case "ADVANCE":
      return { currentIndex: action.nextIndex, isTransitioning: true };
    default:
      return state;
  }
}

const HomeReview = () => {
  const [{ currentIndex, isTransitioning }, dispatch] = useReducer(
    reviewReducer,
    initialState,
  );
  const { reviews, loading } = useFeaturedReviews();

  const handleDotClick = (index) => {
    dispatch({ type: "GOTO", index });
    setTimeout(() => dispatch({ type: "TRANSITION_DONE" }), 300);
  };

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % reviews.length;
      dispatch({ type: "ADVANCE", nextIndex });
      setTimeout(() => dispatch({ type: "TRANSITION_DONE" }), 300);
    }, 2000);
    return () => clearInterval(interval);
  }, [reviews.length, currentIndex]);

  if (loading || reviews.length === 0) {
    return <p>Loading reviews...</p>;
  }

  const currentReview = reviews[currentIndex];

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <h2 className="reviews-title">Genuine Words From Those Who Wear Us.</h2>
        <div
          className={`review-card ${isTransitioning ? "transitioning" : ""}`}
        >
          <div className="review-stars">
            {[...Array(currentReview.rating)].map((_, i) => (
              <span key={i} className="star">
                ⭐
              </span>
            ))}
          </div>
          <div className="review-header">
            <h3 className="reviewer-name">
              {currentReview.author.fullname.firstname +
                " " +
                currentReview.author.fullname.lastname}
            </h3>
            <span className="verified-badge">✓ Verified Buyer</span>
          </div>
          <p className="review-text">{currentReview.about}</p>
        </div>
        <div className="review-navigation">
          <div className="pagination-dots">
            {reviews.map((review, index) => (
              <button
                type="button"
                key={review._id || index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to review slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeReview;
