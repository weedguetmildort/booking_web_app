import React from "react";
import logo from "../assets/images/logo.png";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignUpButton from "./SignUpButton";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner flex flex-row gap-3">
      <Link to="/">
        <img height={5} src={logo} alt="Logo" />
      </Link>

      <SignUpButton />
      <LoginButton />
      <LogoutButton />

    </div>
  );
}

export default Banner;
