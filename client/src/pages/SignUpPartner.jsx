import Banner from "components/Banner";
import Footer from "components/Footer";
import PartnerSignUp from "components/PartnerSignUp";
import React from "react";

function SignUpPartner() {
  return (
    <div>
      <Banner />
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
