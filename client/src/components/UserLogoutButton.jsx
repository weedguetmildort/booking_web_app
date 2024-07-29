import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function UserLogoutButton() {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    // Redirect to login page after logging out
    navigate("/login");
  };

  return (
    <div>
      <h3
        onClick={handleLogout}
        style={{
          paddingRight: "10px",
          cursor: "pointer",
        }}
      >
        Logout
      </h3>
    </div>
  );
}

export default UserLogoutButton;
