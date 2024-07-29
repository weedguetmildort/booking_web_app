import { React } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Logout from "./Logout";

function User() {
  const navigate = useNavigate();
  return (
    <FlexBetween>
      <h3
        onClick={() => navigate("/Login")}
        style={{
          paddingRight: "10px",
          cursor: "pointer",
        }}
      >
        Login
      </h3>
      <h3
        onClick={() => navigate("/SignUp")}
        style={{
          paddingRight: "10px",
          cursor: "pointer",
        }}
      >
        Signup
      </h3>
      <Logout />
    </FlexBetween>
  );
}

export default User;
