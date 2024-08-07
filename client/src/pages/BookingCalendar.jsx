import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";
import PartnerCalendar from "components/PartnerCalendar";
import UserCalendar from "components/UserCalendar";
import Test from "components/Test";

function BookingCalendar() {
  return (
    <div>
      <div>
        <Banner />
        <Navbar />
        <div>
          <h1 className="center">Calendar</h1>
          <div className="center">{/* <PartnerCalendar/> */}</div>
          <div className="center">
            <UserCalendar />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default BookingCalendar;
