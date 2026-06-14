import React, { memo } from "react";
import HeaderCom from "../components/HeaderCom";
import BottomNav from "../components/BottomNav";
import LoginCom from "../components/LoginCom";
import { Navigate } from "react-router-dom";

const Login = memo(() => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" replace />;
  return (
    <>
      <HeaderCom />
      <div className="main">
        <LoginCom />
      </div>
      <BottomNav activeTab="account" />
    </>
  );
});

export default Login;
