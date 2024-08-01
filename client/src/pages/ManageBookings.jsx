import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import Footer from "components/Footer";
import BookingCardUser from "components/BookingCardUser.tsx";
import BookingCardPartner from "components/BookingCardPartner.tsx";
import BookingCardUserInfo from "classes/BookingCardUserInfo";
import BookingCardPartnerInfo from "classes/BookingCardPartnerInfo"

const provider = true;

function ManageBookings() {

    let tempBookingCardInfos = []; // the array to load all BookingCardInfo objects into

    const [bookingCardInfos, setBookingCardInfos] = useState([]); // when loaded , set this to the temp array
    let arrayDataItems = [];

    useEffect(() => {

        setBookingCardInfos(tempBookingCardInfos);

    }, []);

    function prepBookings() {

        // get json and load infos
        // if partner, us pID to query bookings, if user, use uID to query bookings

        if (!partner) {
            tempBookingCardInfos.push(new BookingCardUserInfo(123456789, new Date(Date.UTC(2024, 7, 1, 14, 30)), 30, "Clean windows", "Cleans your windows with professional grade cleaning materials and tools.", "Riley's Window Services")); // 9:30 am local time
            tempBookingCardInfos.push(new BookingCardUserInfo(987654321, new Date(Date.UTC(2024, 7, 5, 16)), 60, "Repair faucet", "Repairs your faucet.", "Kyle's Plumbing")); // 11:00 am local time
        }
        else {
            tempBookingCardInfos.push(new BookingCardParterInfo(123456788, new Date(Date.UTC(2024, 7, 1, 14, 30)), 30, "Clean windows", "Cleans your windows with professional grade cleaning materials and tools.", "Riley's Window Services")); // 9:30 am local time
            tempBookingCardInfos.push(new BookingCardParterInfo(987654328, new Date(Date.UTC(2024, 7, 5, 16)), 60, "Repair faucet", "Repairs your faucet.", "Kyle's Plumbing")); // 11:00 am local time
        }

    }

    prepBookings();

    return (
        <div>
            <div>
                <Banner />
                <Navbar />
                <body className="center">
                    <div>Manage Bookings</div>
                    {!provider && (<ul>
                        {
                            bookingCardInfos.map((info) => {
                                return (
                                    <div>
                                        <BookingCardUser
                                            bookingID={info.getBookingID()}
                                            bookingDate={info.getBookingDate()}
                                            bookingStartTime={info.getBookingStartTime()}
                                            bookingDuration={info.getBookingDuration()}
                                            bookingEndTime={info.getBookingEndTime()}
                                            serviceName={info.getServiceName()}
                                            serviceDescription={info.getServiceDescription()}
                                            businessName={info.getBusinessName()}
                                        />
                                        <br />
                                    </div>
                                )
                            })
                        }
                    </ul>)}
                    {provider && (<ul>
                        {
                            bookingCardInfos.map((info) => {
                                return (
                                    <div>
                                        <BookingCardPartner
                                            bookingID={info.getBookingID()}
                                            bookingDate={info.getBookingDate()}
                                            bookingStartTime={info.getBookingStartTime()}
                                            bookingDuration={info.getBookingDuration()}
                                            bookingEndTime={info.getBookingEndTime()}
                                            serviceName={info.getServiceName()}
                                            serviceDescription={info.getServiceDescription()}
                                            businessName={info.getBusinessName()}
                                        />
                                        <br />
                                    </div>
                                )
                            })
                        }
                    </ul>)}
                </body>
            </div>
            <Footer />
        </div>
    );
}

export default ManageBookings;
