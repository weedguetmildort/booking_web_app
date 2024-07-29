import React from "react";
import UserLogin from "components/UserLogin";
import Banner from "components/Banner";
import FlexBetween from "components/FlexBetween";
import PartnerPortalButton from "components/PartnerPortalButton";
import UserSignupButton from "components/UserSignupButton";

function LoginUser() {
  return (
    <div>
      <FlexBetween>
        <Banner />
        <UserSignupButton />
        <PartnerPortalButton />
      </FlexBetween>

      <div>
        <h1 className="center">User Sign In</h1>
        <div className="center">
          <UserLogin />
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
