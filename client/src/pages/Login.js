import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <div className="banner flex flex-row gap-3">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>

        <div></div>
      </div>
      <div>User Sign In</div>
      <div>
        <input
          type="text"
          placeholder="Username"
          className="border-2 border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Password"
          className="border-2 border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>Forgot password?</div>
    </div>
  );
}

export default Login;
