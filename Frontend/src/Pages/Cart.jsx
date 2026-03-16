import React, { useEffect, useRef } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import { UserDataContext } from "../context/UserContext";
import "../styles/Cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

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
      className="uc-product-img"
      src={src}
      muted
      loop
      playsInline
      preload="none" // don't download until visible
    />
  );
};

const Cart = () => {
  const { user, setUser, activeTab, setActiveTab, loading } =
    React.useContext(UserDataContext);

  if (loading) {
    return <Skeleton />;
  }

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const addToCart = async (suit) => {
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

  const removeToCart = async (suit) => {
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
        toast.success("Removed to Cart!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decCartCount = async (suit) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/suit/${suit._id}/cartitem`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        // console.log("Cart from backend:", response.data.user.cart);
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

  return (
    <>
      <HeaderCom />
      <div className="main">
        <div className="uc-cart-wrapper">
          <div className="uc-breadcrumb">
            Home · <span>Your Shopping Cart</span>
          </div>

          <h1 className="uc-cart-title">Shopping Cart</h1>
          <p className="uc-cart-subtitle">
            Review your selected items before purchase.
            <br />
            Enjoy a seamless shopping experience!
          </p>

          {!user || !user.cart || user.cart.length == 0 ? (
            <div>No Item in the Cart</div>
          ) : (
            user.cart.map((item) => {
              const quantity = item.quantity;
              const inCart = quantity > 0;
              const type = item.suit.file?.[0].mediaType;

              return (
                <div
                  className="uc-cart-item"
                  key={item._id}
                  onClick={() => navigate(`/suit/${item.suit._id}`)}
                >
                  {type === "image" ? (
                    <img
                      src={item.suit.file?.[0]?.url}
                      alt={item.suit.name}
                      className="uc-product-img"
                      loading="lazy"
                    />
                  ) : (
                    <LazyVideo src={item.suit.file?.[0]?.url} />
                  )}

                  <div className="uc-product-info">
                    <h3 className="uc-product-name">{item.suit.name}</h3>
                    <p className="uc-product-size">Size: M</p>
                    <p className="uc-product-price">
                      Rs. {item.suit?.price?.toLocaleString?.() ?? "0"}.00
                    </p>
                  </div>

                  <div
                    className="cart-count"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      onClick={() => removeToCart(item.suit)}
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <div className="uc-qty-control">
                      <button
                        className="uc-qty-btn"
                        onClick={() => decCartCount(item.suit)}
                        disabled={!inCart || quantity <= 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="uc-qty-btn"
                        onClick={() => addToCart(item.suit)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div className="ud-info-wrapper">
            <div className="ud-info-section">
              <h3 className="ud-info-heading">Delivery Information</h3>
              <p className="ud-info-text">
                We process orders within 1-3 business days. Domestic deliveries
                take 3-7 business days, while international shipping times may
                vary. Please allow extra time for remote locations.
              </p>
            </div>

            <div className="ud-info-section">
              <h3 className="ud-info-heading">Exclusive Offers</h3>
              <p className="ud-info-text">
                Explore limited-time offers and special discounts at Aham
                Designer Boutique. Take advantage of these deals before they're
                gone!
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <BottomNav activeTab={"cart"} setActiveTab={setActiveTab} />
    </>
  );
};

export default Cart;
