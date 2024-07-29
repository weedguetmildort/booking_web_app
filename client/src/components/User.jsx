import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { UserContext } from "../UserContext";
import UserLoginButton from "./UserLoginButton";
import UserSignupButton from "./UserSignupButton";
import UserLogoutButton from "./UserLogoutButton";

function User() {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let content;

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
        <UserLoginButton />
        <UserSignupButton />
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
        <UserLogoutButton />
      </FlexBetween>
    );
  }

  return <div>{content}</div>;
}

export default User;
