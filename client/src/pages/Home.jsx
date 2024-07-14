import React from "react";

import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";

function Home() {
  return (
    <div>
      <div>
        <Banner />
        <Navbar />
        <body className="center">
          <div>Find services in your area.</div>
          <div>Popular services</div>
          <div>
            Grow your business with us.
            <p>Become a partner today.</p>
          </div>
          <div>Get free service cost information delivered to your indiv.</div>
          <div>
            <p> </p>
          </div>
        </body>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
