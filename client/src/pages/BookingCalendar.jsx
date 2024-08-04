import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";
import PartnerCalendar from "components/PartnerCalendar";
import UserCalendar from "components/UserCalendar";

function BookingCalendar() {
  return (
    <div>
      <div>
        <Banner />
        <Navbar />
        <div className="center">
          <div>Calendar</div>
          {/* <PartnerCalendar/> */}
          {/* <UserCalendar/> */}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default BookingCalendar;
