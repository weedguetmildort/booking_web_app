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
        <div className="center">Calendar</div>
        <div className="center">
          {/* <PartnerCalendar/> */}
          <UserCalendar/>
          {/* <Test/> */}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default BookingCalendar;
