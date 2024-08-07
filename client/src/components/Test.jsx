import React, { useState } from "react";
import Booking from "classes/Booking.ts";
import BookingDay from "classes/BookingDay.ts";
import moment from "moment";
import axios from "axios";

const partnerID1 = 2; 

function Test() {
    function formatDateToUTC(date) {
        function pad(num, size) {
            let s = String(num);
            while (s.length < size) s = "0" + s;
            return s;
        };

        const year = date.getUTCFullYear();
        const month = pad(date.getUTCMonth(), 2);
        const day = pad(date.getUTCDate(), 2);
        const hours = pad(date.getUTCHours(), 2);
        const minutes = pad(date.getUTCMinutes(), 2);
        const seconds = pad(date.getUTCSeconds(), 2);
        const milliseconds = pad(date.getUTCMilliseconds(), 3);

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    function getTomorrowTime() {
        const today = new Date()
        console.log(today.getUTCMonth());

        const tomorrow = new Date(moment(today).add(1,'d'));
        tomorrow.setHours(0, 0, 0, 0);
        console.log(tomorrow);
        const tomorrowTime = formatDateToUTC(tomorrow);
        console.log(tomorrowTime);
        return tomorrowTime;
    }

    const getHoursOfOperation = async (pID) => {
        axios.get(`http://localhost:5002/db/api/getHours/${pID}`)
            .then(res => {
                console.log(typeof res);
                console.log('Response:', res.data);
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.response) {

                }
                else {

                }
            });
    }

    const getBookings = async (partnerID, startTime) => {
        axios.post('http://localhost:5002/db/api/getFutureBookings', {
            pID: partnerID, startTime: startTime
        })
            .then(res => {
                console.log(typeof res);
                console.log('Response:', res.data);
            })
            .catch(error => {
                console.error('Error:', error);
                if (error.response) {
                    console.log("Response: "+error.response.status);
                }
                else {
                    console.log("No response");
                }
            });
    }
    getHoursOfOperation(partnerID1);
    getBookings(partnerID1, getTomorrowTime());

}

export default Test;