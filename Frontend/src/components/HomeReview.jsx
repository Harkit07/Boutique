import React, { useState, useEffect, useRef } from "react";
import "../styles/HomeReview.css";
import axios from "axios";

const HomeReview = () => {
  const fetched = useRef(false);

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchReviews = async () => {
      try {
        //Fetch Five Reviews for Home Page
        const homeReviews = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/suit/homeReview`,
        );

        if (homeReviews.status == 200) {
          setReviews(homeReviews.data.homeReviews);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  const handleDotClick = (index) => {
    setIsTransitioning(true);
    setCurrentReviewIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const currentReview = reviews[currentReviewIndex];

  if (reviews.length === 0) {
    return <p>Loading reviews...</p>;
  }

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
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentReviewIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeReview;
