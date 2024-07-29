import React from "react";
import UserLogin from "components/UserLogin";
import Banner from "components/Banner";

function LoginUser() {
  return (
    <div>
      <Banner />

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
