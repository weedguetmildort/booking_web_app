import Banner from "components/Banner";
import Footer from "components/Footer";
import UserSignUp from "components/UserSignUp";
import React from "react";

function SignUpUser() {
  return (
    <div>
      <Banner />
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
