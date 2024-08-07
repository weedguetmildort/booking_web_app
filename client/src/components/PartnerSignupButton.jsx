import React from "react";
import { useNavigate } from "react-router-dom";

function PartnerSignupButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to login page after logging out
    navigate("/partnersignup");
  };

  return (
    <div>
      <h3
        onClick={handleLogin}
        style={{
          paddingRight: "10px",
          cursor: "pointer",
        }}
      >
        Signup
      </h3>
    </div>
  );
}

export default PartnerSignupButton;
