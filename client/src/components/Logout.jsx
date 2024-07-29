import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to login page after logging out
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
