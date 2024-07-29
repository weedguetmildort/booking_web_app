import React from "react";
import UserLogin from "components/UserLogin";
import Banner from "components/Banner";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

function LoginUser() {
  const navigate = useNavigate();

  const handlePartnerLogin = () => {
    // Redirect to login page after logging out
    navigate("/partnerlogin");
  };

  return (
    <div>
      <FlexBetween>
        <Banner />
        <h3
          onClick={handlePartnerLogin}
          style={{
            paddingRight: "10px",
            cursor: "pointer",
          }}
        >
          PartnerLogin
        </h3>
      </FlexBetween>

      <div className="center">
        <h1>User Sign In</h1>
      </div>

      <div className="center">
        <UserLogin />
      </div>
    </div>
  );
}

export default LoginUser;
