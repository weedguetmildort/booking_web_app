import Banner from "components/Banner";
import Footer from "components/Footer";
import UserSignUp from "components/UserSignUp";
import React from "react";

function SignUp() {
  return (
    <div>
      <Banner />
      <body className="body center">
        <h1>User Sign Up</h1>
        <div>
          <UserSignUp />
        </div>
      </body>
      <Footer />
    </div>
  );
}

export default SignUp;
