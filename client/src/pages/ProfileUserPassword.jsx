import React from "react";
import Banner from "components/Banner";

import UserProfilePassword from "components/UserProfilePassword";

function ProfileUserPassword() {
  return (
    <div>
      <Banner />
      <h1 className="center">User Password Change</h1>
      <div className="center">
        <UserProfilePassword />
      </div>
    </div>
  );
}

export default ProfileUserPassword;
