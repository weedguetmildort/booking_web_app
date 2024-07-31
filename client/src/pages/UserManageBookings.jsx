import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";

// query all bookings, service information associated with the booking, and partner information (?) associated with this user
// create 

function UserManageBookings() {
    return (
        <div>
            <div>
                <Banner />
                <Navbar />
                <body className="center">
                    <div>User manage bookings page</div>

                </body>
            </div>
            <Footer />
        </div>
    );
}

export default UserManageBookings;
