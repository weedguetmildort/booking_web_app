import React from "react";
import Banner from "components/Banner";

import UserProfile from "components/UserProfile";

function ProfileUser() {
  return (
    <div>
      <Banner />
      <h1 className="center">User Profile Page</h1>
      <div className="center">
        <UserProfile />
      </div>
    </div>
  );
}

export default ProfileUser;
