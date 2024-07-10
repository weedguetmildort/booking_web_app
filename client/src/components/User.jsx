import { React,} from "react";
import { Link } from "react-router-dom";

function User() {

  return (
    <div className="flex flex-row gap-3">
      <Link to="/login">Login</Link>
      <Link to="/signup"> Sign Up</Link>
    </div>
  );
}

export default User;
