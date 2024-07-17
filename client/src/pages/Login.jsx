import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import UserLogin from "components/UserLogin";
import Banner2 from "components/Banner2";
import FlexBetween from "../components/FlexBetween";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Banner from "components/Banner";

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <Banner2 />
      <body className="center">
        <h1>User Sign In</h1>
        <div>
          <UserLogin />
        </div>
      </body>
    </div>
  );
}

export default Login;
