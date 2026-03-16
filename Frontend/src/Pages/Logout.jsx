import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Skeleton.css";

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.status === 200) {
          localStorage.removeItem("token");
          toast.success("Logout successful!");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    logoutUser();
  }, [navigate, token]);

  return (
    <div className="rxo-skeleton-wrapper">
      {/* Header */}
      <div className="rxo-skeleton-header">
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-cart"></div>
      </div>

      {/* Banner */}
      <div className="rxo-skeleton-banner"></div>

      {/* Bottom Nav */}
      <div className="rxo-skeleton-nav">
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
      </div>
    </div>
  );
};

export default Logout;
