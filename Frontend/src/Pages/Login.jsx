import React, { useEffect } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import LoginCom from "../components/LoginCom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <HeaderCom />
      <div className="main">
        <LoginCom />
      </div>
      <BottomNav />
    </>
  );
};

export default Login;
