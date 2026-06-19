import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        zIndex: 9999,
      }}
    >
      <img
        src="/PageNotFound.png"
        alt="Page Not Found"
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          objectFit: "contain",
        }}
      />
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "24px",
          padding: "12px 32px",
          fontSize: "18px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
