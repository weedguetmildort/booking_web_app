import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { UserContext } from "../UserContext";

function User() {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let content;

  const handleSignup = () => {
    // Redirect to login page after logging out
    navigate("/signup");
  };

  const handleLogin = () => {
    // Redirect to login page after logging out
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    // Redirect to login page after logging out
    navigate("/login");
  };

  const handleProfile = () => {
    // Redirect to login page after logging out
    navigate("/profile");
  };

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    content = (
      <FlexBetween>
        <h3
          onClick={handleLogin}
          style={{
            paddingRight: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </h3>
        <h3
          onClick={handleSignup}
          style={{
            paddingRight: "10px",
            cursor: "pointer",
          }}
        >
          Signup
        </h3>
      </FlexBetween>
    );
  } else {
    content = (
      <FlexBetween>
        <h3
          onClick={handleProfile}
          style={{
            paddingRight: "10px",
            cursor: "pointer",
          }}
        >
          Profile
        </h3>
        <h3
          onClick={handleLogout}
          style={{
            paddingRight: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </h3>
      </FlexBetween>
    );
  }

  return <div>{content}</div>;
}

export default User;
