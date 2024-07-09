import React from "react";
import logo from "../assets/images/logo.png";
import User from "./User";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner flex flex-row gap-3">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>

      <User />
    </div>
  );
}

export default Banner;
