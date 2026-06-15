import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/MyContext";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const { token, setToken, setUser } = useAuth();

  useEffect(() => {
    setToken(null);
    setUser(null);

    try {
      navigate("/login", { replace: true });
    } catch (err) {
      window.location.href = "/login";
    }

    if (token) {
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/auth/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .catch(() => {});
    }
  }, []);

  return null;
};

export default Logout;
