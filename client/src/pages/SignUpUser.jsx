import Banner from "components/Banner";
import Footer from "components/Footer";
import UserSignUp from "components/UserSignUp";
import React from "react";
import FlexBetween from "components/FlexBetween";
import PartnerPortalButton from "components/PartnerPortalButton";
import UserLoginButton from "components/UserLoginButton";

function SignUpUser() {
  return (
    <div>
      <FlexBetween>
        <Banner />
        <UserLoginButton />
        <PartnerPortalButton />
      </FlexBetween>

      <div>
        <h1 className="center">User Sign Up</h1>
        <div className="center">
          <UserSignUp />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpUser;
