import React from "react";
import Banner from "components/Banner";
import FlexBetween from "components/FlexBetween";
import User from "components/User";
import Navbar from "components/Navbar";
import { useNavigate } from "react-router-dom";

function BusinessLanding() {
  const business = JSON.parse(localStorage.getItem("business"));
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <FlexBetween>
          <Banner />
          <User />
        </FlexBetween>

        <Navbar />
      </div>
      <h1 className="center">{business.name}</h1>
      <div className="center">
        <h3>
          Address: {business.address}, {business.city}, {business.state}{" "}
          {business.zip}
        </h3>
      </div>

      <div className="center">
        <h3>About Us: {business.about}</h3>
      </div>
      <div className="center">
        <h3>Service: {business.serviceName}</h3>
      </div>
      <div className="center">
        <h3>Description: {business.description}</h3>
      </div>
      <div className="center">
        <h3>Duration: {business.duration} min</h3>
      </div>
      <div className="center">
        <h3>Cost: ${business.cost}</h3>
      </div>
      <div className="center">
        <button
          type="button"
          style={{
            padding: "10px",
            margin: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/calendar")}
        >
          Schedule
        </button>
      </div>
    </div>
  );
}

export default BusinessLanding;
