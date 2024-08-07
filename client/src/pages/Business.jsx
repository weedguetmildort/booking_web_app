import React from "react";
import Banner from "components/Banner";
import BusinessProfile from "components/BusinessProfile";

function Business() {
  return (
    <div>
      <Banner />
      <h1 className="center">Business Profile Page</h1>
      <div className="center">
        <BusinessProfile />
      </div>
    </div>
  );
}

export default Business;
