import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user and token are already stored
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        // Navigate to profile page if user is already logged in
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div>
      {/* <div>
        <h1>Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
      </div> */}
    </div>
  );
}

export default ProfileInfo;
