import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/MyContext";
import { toast } from "react-toastify";
import { Skeleton as BoneyardSkeleton } from "boneyard-js/react";
import { useBoneyard } from "../utils/boneyard";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isBoneyard = useBoneyard();
  const redirected = useRef(false);

  useEffect(() => {
    if (!loading && !user && !redirected.current && !isBoneyard) {
      redirected.current = true;
      toast.warning("Please Login First");
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate, isBoneyard]);

  if (loading || isBoneyard) {
    return <BoneyardSkeleton name="protected-page" loading={true} />;
  }
  if (!user) return null;
  return <>{children}</>;
};

export default UserProtectedWrapper;
