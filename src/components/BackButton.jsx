import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} 
      style={{
        backgroundColor: "#ff5722",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1rem",
        margin: "10px 0",
      }}
    >
      ← Back
    </button>
  );
};

export default BackButton;
