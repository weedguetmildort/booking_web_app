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
              <body className="center">
              <div>About Albert's List</div>
              <div>Popular services offered by fellow partners and given to users who wish for services</div>
              <div>
                  Helping to grow other services since 2024.
                  <p>We began off as a small company from Florida, and managed to grow our services across the country</p>
              </div>
              <div>You can find our number within our Contact Page. If you have any questions, feel free to contact one of our providers</div>
              <div>
                  <p> </p>
              </div>
              </body>
          </div>
          <Footer />
      </div>
  );
}

export default About;
