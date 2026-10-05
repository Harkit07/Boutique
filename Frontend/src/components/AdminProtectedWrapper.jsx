import { Navigate } from "react-router-dom";
import { useAuth } from "../context/MyContext";

const AdminProtectedWrapper = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/account" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedWrapper;
