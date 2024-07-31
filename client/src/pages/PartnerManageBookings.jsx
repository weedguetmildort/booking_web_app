import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";

function PartnerManageBookings() {
    return (
        <div>
            <div>
                <Banner />
                <Navbar />
                <body className="center">
                    <div>Partner manage bookings page</div>
                </body>
            </div>
            <Footer />
        </div>
    );
}

export default PartnerManageBookings;
