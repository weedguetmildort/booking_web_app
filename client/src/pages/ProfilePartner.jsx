import React from "react";
import Banner from "components/Banner";
import PartnerProfile from "components/PartnerProfile";

function ProfilePartner() {
  return (
    <div>
      <Banner />
      <h1 className="center">Partner Profile Page</h1>
      <div className="center">
        <PartnerProfile />
      </div>
    </div>
  );
}

export default ProfilePartner;
