import React from "react";

import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";
import FlexBetween from "components/FlexBetween";

import { Box } from "@mui/material";

function Home() {
  return (
    <div>
      <div>
        <div>
          <Banner />
          <Navbar />
        </div>
        <div>
          <div>
            <div className="section">
              <div>
                <h1>Find services in your area.</h1>
              </div>

              <div>Searchbar</div>
              <div>Please enter a valid zip code.</div>
            </div>
            <div className="section">
              <h6> Popular services</h6>
            </div>
            <div className="section">
              <FlexBetween>
                <div></div>
                <div>
                  <h3>Grow your business with us. Become a partner today.</h3>
                  <div>Become a partner</div>
                </div>
              </FlexBetween>
            </div>

            <div className="section">
              <FlexBetween>
                <h4>
                  Get free service cost information delivered to your inbox.
                </h4>
                <div>Sign Up</div>
              </FlexBetween>
            </div>
            <div className="spacer"></div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
