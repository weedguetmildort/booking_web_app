import React from "react";
import Banner from "components/Banner";
import PartnerProfilePassword from "components/PartnerProfilePassword";

function PartnerUserPassword() {
  return (
    <div>
      <Banner />
      <h1 className="center">Partner Password Change</h1>
      <div className="center">
        <PartnerProfilePassword />
      </div>
    </div>
  );
}

export default PartnerUserPassword;
