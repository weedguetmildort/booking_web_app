import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import UserLogin from "components/UserLogin";

function Login() {
  return (
    <div>
      <div className="banner flex flex-row gap-3">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>

        <div></div>
      </div>
      <body className="body center">
        <div>User Sign In</div>
        <div>
          <UserLogin />
        </div>
      </body>
    </div>
  );
}

export default Login;
