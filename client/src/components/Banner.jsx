import React from "react";
import logo from "../assets/images/logo.png";
import User from "./User";
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

      <User />
    </FlexBetween>
  );
}

export default Banner;
