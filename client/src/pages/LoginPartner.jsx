import React from "react";
import PartnerLogin from "components/PartnerLogin";
import Banner from "components/Banner";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

function LoginPartner() {
  const navigate = useNavigate();

  const handlePartnerSignup = () => {
    // Redirect to login page after logging out
    navigate("/partnersignup");
  };

  return (
    <div>
      <FlexBetween>
        <Banner />
        <h3
          onClick={handlePartnerSignup}
          style={{
            paddingRight: "10px",
            cursor: "pointer",
          }}
        >
          PartnerSignup
        </h3>
      </FlexBetween>

      <div className="center">
        <h1>Partner Sign In</h1>
      </div>

      <div className="center">
        <PartnerLogin />
      </div>
    </div>
  );
}

export default LoginPartner;
