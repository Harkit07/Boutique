import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Skeleton from "./Skeleton";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = React.useContext(UserDataContext);

  useEffect(() => {
    if (!loading && !user) {
      toast.warning("Please Login First");
      navigate("/login");
    }
  }, [loading, user]);

  if (loading) {
    return <Skeleton />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
