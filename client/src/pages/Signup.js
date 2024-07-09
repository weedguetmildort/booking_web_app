import Banner from "components/Banner";
import Footer from "components/Footer";
import UserSignUp from "components/UserSignUp";
import React from "react";

function SignUp() {
  return (
    <div>
      <Banner />
      <body className="body">
        <h1 className="flex items-center justify-center pt-3">User Sign Up</h1>
        <div className="flex items-center justify-center pt-3">
          <UserSignUp />
        </div>
      </body>
      <Footer />
    </div>
  );
}

export default SignUp;
