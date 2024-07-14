import React from "react";
import logo from "../assets/images/logo.png";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignUpButton from "./SignUpButton";
import { Link } from "react-router-dom";
import FlexBetween from "./FlexBetween";

function Banner() {
  return (
    <FlexBetween className="banner">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          style={{
            maxWidth: "60%",
            height: "auto",
            display: "block",
          }}
        />
      </Link>
      <Link to="/profile">PROFILE</Link>
      <SignUpButton />
      <LoginButton />
      <LogoutButton />

      <User />
    </FlexBetween>
  );
}

export default Banner;
