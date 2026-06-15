import React, { useCallback, memo } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/MyContext";
import "../styles/Cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const LazyVideo = ({ src, name = "Product" }) => {
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting ? video.play().catch(() => {}) : video.pause(),
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
      preload="none"
    />
  );
};

const Cart = memo(() => {
  const { user, setUser, loading, token } = useAuth();
  const navigate = useNavigate();

  const updateCartState = useCallback(
    (responseData) => {
      const newCart = responseData.user?.cart ?? responseData.cart ?? [];
      setUser((prev) => ({ ...prev, cart: newCart }));
      return newCart;
    },
    [setUser],
  );

  const addToCart = useCallback(
    async (suit) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/cart/items/${suit._id}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status === 200) {
          updateCartState(response.data);
          toast.success("Added to cart!");
        }
      } catch (error) {
        toast.error("Failed to add item");
      }
    },
    [token, updateCartState],
  );

  const removeToCart = useCallback(
    async (suit) => {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/cart/items/${suit._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status === 200) {
          updateCartState(response.data);
          toast.success("Removed from cart!");
        }
      } catch (error) {
        toast.error("Failed to remove item");
      }
    },
    [token, updateCartState],
  );

  const decCartCount = useCallback(
    async (suit) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/cart/items/${suit._id}/decrement`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status === 200) {
          updateCartState(response.data);
          toast.success("Quantity decreased!");
        }
      } catch (error) {
        toast.error("Failed to update quantity");
      }
    },
    [token, updateCartState],
  );

  if (loading) return <Skeleton />;
  const cartItems = user?.cart ?? [];

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
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">No Item in the Cart</div>
          ) : (
            cartItems.map((item) => {
              const quantity = item.quantity;
              const inCart = quantity > 0;
              const type = item.suit?.file?.[0]?.mediaType;
              return (
                <div key={item._id} className="uc-cart-item">
                  <button
                    type="button"
                    className="uc-cart-item-preview"
                    onClick={() => navigate(`/suit/${item.suit?._id}`)}
                  >
                    {type === "image" ? (
                      <img
                        src={item.suit?.file?.[0]?.url}
                        alt={item.suit?.name}
                        className="uc-product-img"
                        loading="lazy"
                      />
                    ) : (
                      <LazyVideo
                        src={item.suit?.file?.[0]?.url}
                        name={item.suit?.name}
                      />
                    )}
                    <div className="uc-product-info">
                      <h3 className="uc-product-name">{item.suit?.name}</h3>
                      <p className="uc-product-size">Size: M</p>
                      <p className="uc-product-price">
                        Rs. {item.suit?.price?.toLocaleString?.() ?? "0"}.00
                      </p>
                    </div>
                  </button>
                  <div className="cart-count">
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
                        type="button"
                        className="uc-qty-btn"
                        onClick={() => decCartCount(item.suit)}
                        disabled={!inCart || quantity <= 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
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
                We process orders within 1–3 business days...
              </p>
            </div>
            <div className="ud-info-section">
              <h3 className="ud-info-heading">Exclusive Offers</h3>
              <p className="ud-info-text">
                Explore limited-time offers and special discounts...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <BottomNav activeTab="cart" />
    </>
  );
});

export default Cart;
