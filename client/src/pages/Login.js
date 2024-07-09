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
      <body className="body">
        <div>User Sign In</div>
        <div>
          <input type="text" placeholder="Username" className="custom-border" />
        </div>
        <div>
          <input type="text" placeholder="Password" className="custom-border" />
        </div>
        <div>Forgot password?</div>
      </body>
    </div>
  );
}

export default Login;
