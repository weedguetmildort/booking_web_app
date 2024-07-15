import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";
import ProfileInfo from "components/ProfileInfo";

function About() {
  return (
    <div>
      <div>
        <Banner />
        <Navbar />
        <body className="center">
          <div>Profile info</div>
          <ProfileInfo />
        </body>
      </div>
      <Footer />
    </div>
  );
}

export default About;
