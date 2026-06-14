import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/MyContext";
import { toast } from "react-toastify";
import Skeleton from "./Skeleton.jsx";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const redirected = useRef(false);

  useEffect(() => {
    if (!loading && !user && !redirected.current) {
      redirected.current = true;
      toast.warning("Please Login First");
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) return <Skeleton />;
  if (!user) return null;
  return <>{children}</>;
};

export default UserProtectedWrapper;
