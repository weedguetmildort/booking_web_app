import React, { useContext, useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import UserLoginButton from "./UserLoginButton";
import UserSignupButton from "./UserSignupButton";
import UserLogoutButton from "./UserLogoutButton";
import UserProfileButton from "./UserProfileButton";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  let content;

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");

    // if (token === null) {
    //   logout();
    //   navigate("/");
    // }

    if (token) {
      setIsLoggedIn(true);
    }
  }, [logout, navigate]);

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
        <UserProfileButton />
        <UserLogoutButton />
      </FlexBetween>
    );
  }

  return <div>{content}</div>;
}

export default User;
