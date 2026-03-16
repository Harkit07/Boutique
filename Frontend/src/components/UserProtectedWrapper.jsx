import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Skeleton from "./Skeleton";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user } = React.useContext(UserDataContext);

  useEffect(() => {
    if (!user) {
      toast.warning("Please Login First");
      navigate("/login");
    }
  }, [user]);

  return <>{children}</>;
};

export default UserProtectedWrapper;
