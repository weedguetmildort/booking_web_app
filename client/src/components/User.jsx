import { React } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignUpButton from "./SignUpButton";

function User() {
  return (
    <div className="flex flex-row gap-3">
      <Link to="/profile">PROFILE</Link>
      <SignUpButton />
      <LoginButton />
      <LogoutButton />
      <Link to="/login">Login</Link>
      <Link to="/signup"> Sign Up</Link>
    </div>
  );
}

export default User;
