import Banner from "components/Banner";
import Footer from "components/Footer";
import PartnerSignUp from "components/PartnerSignUp";
import React from "react";
import FlexBetween from "components/FlexBetween";
import PartnerLoginButton from "components/PartnerLoginButton";
import UserPortalButton from "components/UserPortalButton";

function SignUpPartner() {
  return (
    <div>
      <FlexBetween>
        <Banner />
        <PartnerLoginButton />
        <UserPortalButton />
      </FlexBetween>
      <div>
        <h1 className="center">Partner Sign Up</h1>
        <div className="center">
          <PartnerSignUp />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPartner;
