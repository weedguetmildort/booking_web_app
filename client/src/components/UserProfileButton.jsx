import React from "react";
import { useNavigate } from "react-router-dom";

function UserProfileButton() {
  const navigate = useNavigate();

  const handleProfile = () => {
    // Redirect to login page after logging out
    navigate("/profile");
  };

  return (
    <div>
      <h3
        onClick={handleProfile}
        style={{
          paddingRight: "10px",
          cursor: "pointer",
        }}
      >
        Profile
      </h3>
    </div>
  );
}

export default UserProfileButton;
