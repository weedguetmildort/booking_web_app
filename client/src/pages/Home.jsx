import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import SearchBar from "components/SearchBar";
import User from "components/User";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div>
          <FlexBetween>
            <Banner />
            <User />
          </FlexBetween>

          <Navbar />
        </div>
        <div>
          <div>
            <div
              style={{
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <div>
                <h1>Find services in your area.</h1>
              </div>

              <div>
                <SearchBar />
              </div>
            </div>
            <div className="seethru">
              <h3
                className="center"
                style={{
                  paddingLeft: "10px",
                  color: "black",
                }}
              >
                Where you can find any services!
              </h3>
            </div>
            <div className="section">
              <FlexBetween>
                <div>
                  <h2>Grow your business with us. Become a partner today.</h2>
                  <div>Become a partner</div>
                  <button
                    style={{ padding: "10px", margin: "5px" }}
                    onClick={() => navigate("/partnersignup")}
                  >
                    Sign Up
                  </button>
                </div>
              </FlexBetween>
            </div>

            <div className="section seethru">
              <FlexBetween>
                <h2
                  style={{
                    color: "black",
                  }}
                >
                  Get free service cost information delivered to your inbox.
                </h2>
                <button
                  style={{ padding: "10px", margin: "5px" }}
                  onClick={() => navigate("/signup")}
                >
                  Click Here
                </button>
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
