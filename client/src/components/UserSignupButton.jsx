import React from "react";
import { useNavigate } from "react-router-dom";

function UserSignupButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to login page after logging out
    navigate("/signup");
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

export default UserSignupButton;
