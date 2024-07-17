import { React } from "react";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h4 onClick={() => navigate("/Login")}>Login</h4>
      <h4 onClick={() => navigate("/SignUp")}>Sign Up</h4>
    </div>
  );
}

export default User;
