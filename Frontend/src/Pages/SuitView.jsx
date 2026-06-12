import "../styles/SuitView.css";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { UserDataContext } from "../context/UserContext";
import React, {
  useContextState,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import SuitImgCom from "../components/SuitImgCom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";

const StarRating = ({ rating, max = 5 }) => {
  return (
    <div>
      {Array.from({ length: max }, (_, i) => (
        <span key={i}>{i < rating ? "\u2B50" : null}</span>
      ))}
    </div>
  );
};

const SuitView = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { user, setFilteredSuit, setActiveTab } = useContext(UserDataContext);

  const [loading, setLoading] = useState(true);
  const [suit, setSuit] = useState(null);
  const [reviewForm, setReviewForm] = useState(false);
  const fetchSuitDetails = useCallback(async () => {
    const controller = new AbortController();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/suits/single-product/${id}`,
        { signal: controller.signal },
      );
      if (response.status === 200) {
        setSuit(response.data.suit);
        setLoading(false);
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
      }
    }
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const cleanup = fetchSuitDetails();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [fetchSuitDetails]);

  const deleteSuit = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/suits/delete/${suit._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        toast.success("Suit deleted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete suit");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/reviews/delete-review/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        toast.success("Review deleted!");
        fetchSuitDetails();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review");
    }
  };

  const addRevBtn = () => {
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
    } else {
      setReviewForm(!reviewForm);
    }
  };

  if (loading) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  if (!suit) {
    return <div>Product not found</div>;
  }

  const reviews = suit.review || [];

  return (
    <>
      <HeaderCom />
      <div className="main">
        <section className="saree-details-section">
          <div className="saree-details-container">
            <div className="saree-image-side">
              <SuitImgCom suit={suit} />
            </div>

            <div className="saree-info-side">
              <div className="saree-breadcrumb">
                <Link to="/">Home</Link> / <span>{suit.category}</span>
              </div>

              <h1 className="saree-title">{suit.name}</h1>
              <p className="saree-price">₹{suit.price}</p>
              <p className="saree-tax-info">MRP Incl. of all taxes</p>

              <div className="saree-action-buttons">
                <button type="button" className="add-to-cart-btn">
                  Add To Cart
                </button>
                <button type="button" className="buy-now-btn">
                  Buy Now
                </button>
              </div>

              {user && user.role === "admin" && (
                <div style={{ marginTop: "20px" }}>
                  <Button
                    onClick={deleteSuit}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete Product
                  </Button>
                </div>
              )}

              <div className="saree-description-box">
                <h3>Product Description</h3>
                <p>{suit.description}</p>
              </div>
            </div>
          </div>

          <div className="saree-reviews-container">
            <h2>Customer Reviews</h2>
            <ul className="saree-reviews-list">
              {reviews.map((rev) => (
                <li key={rev._id} className="saree-review-item">
                  <div className="saree-review-stars">
                    <StarRating rating={rev.rating} />
                    {((user && rev.author._id === user._id) ||
                      (user && user.role === "admin")) && (
                      <Button
                        onClick={() => deleteReview(rev._id)}
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                  <p className="saree-review-text">{rev.about}</p>
                  <span className="saree-review-author">
                    — {rev.author.fullname.firstname}{" "}
                    {rev.author.fullname.lastname}
                  </span>
                </li>
              ))}
            </ul>
            <button type="button" className="address-btn" onClick={addRevBtn}>
              Add a Review
            </button>
          </div>
          {reviewForm && (
            <ReviewForm suit={suit} fetchSuitDetails={fetchSuitDetails} />
          )}
        </section>
      </div>
      <Footer />
      <BottomNav activeTab={"shop"} setActiveTab={setActiveTab} />
    </>
  );
};

export default SuitView;
