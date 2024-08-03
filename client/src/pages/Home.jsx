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
                style={{
                  paddingLeft: "10px",
                  color: "black",
                }}
              >
                Popular services
              </h3>
            </div>
            <div className="section">
              <FlexBetween>
                <div></div>
                <div>
                  <h2>Grow your business with us. Become a partner today.</h2>
                  <div>Become a partner</div>
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
                <h2
                  onClick={() => navigate("/SignUp")}
                  style={{
                    paddingLeft: "10px",
                    cursor: "pointer",
                    color: "black",
                  }}
                >
                  Signup
                </h2>
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
