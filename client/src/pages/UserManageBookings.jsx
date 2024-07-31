import React from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";
import BookingCard from "components/BookingCard";
import BookingCardInfo from "classes/BookingCardInfo";

// query all bookings, service information associated with the booking, and partner information (?) associated with this user
// create a BookingCardInfo object for each booking you got and the associated infomation.
// render a list of BookingCards each with unique BookingCardInfo 

let tempBookingCardInfos = []; // the array to load all BookingCardInfo objects into

const [bookingCardInfos, setBookingCardInfos] = useState([]); // when loaded , set this to the temp array


function UserManageBookings() {

    function prepBookings() {

        // get json and load infos

        tempBookingCardInfos.push(new BookingCardInfo());

    }

    prepBookings();

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
