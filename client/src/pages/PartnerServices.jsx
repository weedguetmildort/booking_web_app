import React from "react";
import Banner from "components/Banner";
import Services from "components/Services";

function PartnerServices() {
  return (
    <div>
      <Banner />
      <h1 className="center">Service Page</h1>
      <div className="center">
        <Services />
      </div>
    </div>
  );
}

export default PartnerServices;
