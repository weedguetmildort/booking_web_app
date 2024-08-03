import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (


    <div
      className="footer"
      style={{
        display: "flex",
      }}
    >
      <p
        onClick={() => navigate("/Contact")}
        style={{
          paddingRight: "10px",
          cursor: "pointer",
        }}
      >
        Contact Us
      </p>
      <p
        onClick={() => navigate("/About")}
        style={{
          paddingRight: "10px",
          cursor: "pointer",
        }}
      >
        About
      </p>

    </div>
  );
}

export default Footer;
