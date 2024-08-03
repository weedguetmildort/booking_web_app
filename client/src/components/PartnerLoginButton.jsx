import React from "react";
import { useNavigate } from "react-router-dom";

function PartnerLoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to login page after logging out
    navigate("/partnerlogin");
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
        Login
      </h3>
    </div>
  );
}

export default PartnerLoginButton;
