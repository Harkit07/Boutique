import React, { useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Skeleton.css";

// Custom hook for logout
const useLogout = (token, navigate) => {
  const isMounted = useRef(true);

  const performLogout = useCallback(async () => {
    const controller = new AbortController();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        },
      );
      if (response.status === 200 && isMounted.current) {
        localStorage.removeItem("token");
        toast.success("Logout successful!");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (!axios.isCancel(error) && isMounted.current) {
        console.error(error.response?.data || error.message);
      }
    }
    return () => controller.abort();
  }, [token, navigate]);

  useEffect(() => {
    performLogout();
    return () => {
      isMounted.current = false;
    };
  }, [performLogout]);

  return null;
};

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useLogout(token, navigate);

  return (
    <div className="rxo-skeleton-wrapper">
      <div className="rxo-skeleton-header">
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-menu"></div>
        <div className="rxo-skeleton-cart"></div>
      </div>
      <div className="rxo-skeleton-banner"></div>
      <div className="rxo-skeleton-nav">
        <div className="rxo-skeleton-menu"></div>
      </div>
    </div>
  );
};

export default Logout;
