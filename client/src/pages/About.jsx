import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";

function About() {
  return (
    <div>
      <div>
        <Banner />
        <Navbar />
        <body
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
        </body>
      </div>
      <Footer />
    </div>
  );
}

export default About;
