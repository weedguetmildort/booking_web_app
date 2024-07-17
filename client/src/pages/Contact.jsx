import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";

function Contact() {
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
            Contact Us
          </h1>
          <p>
            Feel Free to Contact us at our local number <br /> 123-456-7890
            <br />
            Our office ours are between 9AM-5PM, <br />
            Monday through Friday. <br />
            On the weekends, we are available to take calls
            <br /> between 9AM-4PM.
          </p>
          <div>
            <p> </p>
          </div>
        </body>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
