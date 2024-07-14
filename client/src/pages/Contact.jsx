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
              <body className="center">
              <div>Contact Us</div>
              <div>Feel Free to Contact Us at our local number</div>
              <div>
                  123-456-7890
                  <p>Our office ours are between 9am-5pm on the weekdays</p>
              </div>
              <div>On the weekends, we are available to take calls between 9am-4pm. </div>
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
