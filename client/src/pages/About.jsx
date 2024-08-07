import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";
import FlexBetween from "components/FlexBetween";
import User from "components/User";

function About() {
  return (
    <div>
      <div>
        <FlexBetween>
          <Banner />
          <User />
        </FlexBetween>
        <Navbar />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1
            style={{
              paddingTop: "100px",
            }}
          >
            About Albert's List
          </h1>
          <p>
            Popular services offered by fellow partners and
            <br /> given to users who wish for services.
            <br /> Helping to grow other services since 2024.
            <br /> We began off as a small company from Florida,
            <br /> and managed to grow our services across the country. <br />
            If you have any questions, feel free to contact one of our
            providers.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
