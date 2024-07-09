import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function User() {
  return (
    <div className="flex flex-row gap-3">
      <Link to="/login">Login</Link>
      <Link to="/signup"> Sign Up</Link>
      <FaRegUserCircle />
    </div>
  );
}

export default User;
