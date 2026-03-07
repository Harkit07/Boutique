import HomeCom from "../components/HomeCom";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import { UserDataContext } from "../context/UserContext";
import React, { useState } from "react";
import SuitImgCom from "../components/SuitImgCom";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/SuitView.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const SuitView = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser, setAllSuit, allSuit, setFilteredSuit, setActiveTab } =
    React.useContext(UserDataContext);
  const [loading, setLoading] = useState(true);
  const [suit, setSuit] = useState("");
  const [reviewForm, setReviewForm] = useState(false);
  const [delSuitBtn, setDelSuitBtn] = useState("Delete Suit");

  const fetchSuitDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/suit/${id}`,
      );
      if (response.status === 201) {
        setLoading(false);
        const data = response.data;
        setSuit(data.suit);
        setReviewForm(false);
        window.scrollTo({ top: 0, behavior: "smooth" }); // <-- scroll to top
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSuitDetails();
  }, []);

  const cartItem = user?.cart?.find(
    (item) => item.suit?._id?.toString() === suit?._id?.toString(),
  );
  const quantity = cartItem?.quantity || 0;
  const inCart = !!cartItem;

  if (loading) {
    return <div>Loading</div>;
  }

  const deleteReviw = async (revId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/suit/${suit._id}/review/${revId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 201) {
        toast.success("Review Deleted Successful!");
        fetchSuitDetails();
        const data = response.data;
        window.scrollTo({ top: 0, behavior: "smooth" }); // <-- scroll to top
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/suit/${suit._id}/cart`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        setUser((prev) => ({
          ...prev,
          cart: response.data.user.cart,
        }));
        toast.success("Added to Cart!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeToCart = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/suit/${suit._id}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        setUser((prev) => ({
          ...prev,
          cart: response.data.user.cart,
        }));
        toast.success("Delete From Cart!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decCartCount = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/suit/${suit._id}/cartitem`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        setUser((prev) => ({
          ...prev,
          cart: response.data.user.cart,
        }));
        toast.success("Removed to Cart!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSuit = async () => {
    setDelSuitBtn("Deleting...");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/suit/${suit._id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        toast.success("Suit Deleted Successful!");
        // Remove deleted suit from context
        const updatedAllSuit = allSuit.filter((s) => s._id !== suit._id);
        setAllSuit(updatedAllSuit);
        setFilteredSuit(updatedAllSuit); // keep filtered in sync

        navigate("/shop");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(error.response?.data?.message || "Try again");
      }
      if (error.response?.status === 403) {
        toast.error(error.response?.data?.message || "Try again");
      }
      console.log(error);
    }
  };

  const addRevBtn = () => {
    setReviewForm(!reviewForm);
    if (!user) {
      toast.warning("Please Login First");
      navigate("/login");
    }
  };

  const StarRating = ({ rating, max = 5 }) => {
    return (
      <div>
        {Array.from({ length: max }, (_, i) => (
          <span key={i}>{i < rating ? "⭐" : null}</span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <>
        <HeaderCom />
        <div className="main">
          <section className="saree-slider-section">
            <div className="breadcrumb">
              <Link
                to="/home"
                className="nav-link"
                style={{ background: "transparent" }}
              >
                Home
              </Link>
              <span>•</span>
              <br />
              <b>{suit.name}</b>
            </div>
            <SuitImgCom files={suit.file} />
            {/* PRODUCT DETAILS */}
            <div className="saree-product-info">
              <h2 className="saree-product-title">{suit.name}</h2>

              <p className="saree-product-price">
                Rs.{suit.price.toLocaleString()}.00
              </p>

              <div className="saree-product-viewing">
                👁 <span>27 peoples are viewing this right now</span>
              </div>

              <div className="saree-product-actions">
                <button className="saree-product-link">Ask a question</button>
                <button className="saree-product-link">Share</button>
              </div>

              <div className="saree-product-cart">
                <div className="saree-qty-box">
                  <button
                    className="uc-qty-btn"
                    onClick={decCartCount}
                    disabled={!inCart || quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button className="uc-qty-btn" onClick={addToCart}>
                    +
                  </button>
                </div>

                {inCart ? (
                  <button onClick={removeToCart} className="saree-add-cart">
                    Remove To Cart
                  </button>
                ) : (
                  <button onClick={addToCart} className="saree-add-cart">
                    Add To Cart
                  </button>
                )}
              </div>

              <button className="saree-buy-now">Buy It Now</button>
              {user.role === "admin" ? (
                <button className="saree-del-now" onClick={deleteSuit}>
                  Delete Suit
                </button>
              ) : null}
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div className="saree-product-description">
              <h3 className="saree-desc-title">Description:</h3>

              <h4 className="saree-desc-subtitle">{suit.description}</h4>
            </div>
            {/* PRODUCT REVIEWS */}
            <div className="saree-review-section">
              <h3 className="saree-review-title">Reviews:</h3>

              <h4 className="saree-review-subtitle">Customer Feedback</h4>

              <ul className="saree-review-list">
                {[...suit.review].reverse().map((rev) => {
                  return (
                    <li className="saree-review-item" key={rev._id}>
                      <div className="saree-review-stars">
                        <StarRating rating={rev.rating} />
                        {(user && rev.author._id == user._id) ||
                        (user && user.role == "admin") ? (
                          <Button
                            onClick={() => deleteReviw(rev._id)}
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        ) : null}
                      </div>
                      <p className="saree-review-text">{rev.about}</p>
                      <span className="saree-review-author">
                        — {rev.author.fullname.firstname}{" "}
                        {rev.author.fullname.lastname}
                      </span>
                    </li>
                  );
                })}

                <li className="saree-review-item">
                  <div className="saree-review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="saree-review-text">
                    Beautiful saree, very elegant look and great quality fabric.
                  </p>
                  <span className="saree-review-author">
                    — Anjali (Verified Buyer)
                  </span>
                </li>
                <li className="saree-review-item">
                  <div className="saree-review-stars">⭐⭐⭐⭐</div>
                  <p className="saree-review-text">
                    The zari work is subtle and classy. Perfect for festive
                    wear.
                  </p>
                  <span className="saree-review-author">— Meena</span>
                </li>
              </ul>
              <button className="address-btn" onClick={addRevBtn}>
                Add a Review
              </button>
            </div>
            {reviewForm ? (
              <ReviewForm suit={suit} fetchSuitDetails={fetchSuitDetails} />
            ) : null}
          </section>
        </div>
        <Footer />
        <BottomNav activeTab={"shop"} setActiveTab={setActiveTab} />
      </>
    </div>
  );
};

export default SuitView;
