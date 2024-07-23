import React, { useState } from "react";
import Calendar from "react-calendar";
import { differenceInCalendarDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import Booking from "classes/Booking.ts";
import BookingDay from "classes/BookingDay.ts";

function UserCalendar() {

    const today = new Date();
    // following values are temp
    const twentySeventh = new Date(2024, 6, 27); // month zero indexed
    const allBookingDays = new Map(); // key: date in toDateString, value: corresponding BookingDay
    const disabledDates = [twentySeventh];
    const availableDates = []; // must be array of Dates
    const selectedDateAvailableTimes = [];

    const [selectedDate, setDate] = useState(new Date());
    const [renderPicker, setRenderPicker] = useState(true);

    function prepareBookings() {

        function loadBookings() {
            // query backend api, make Booking objects
            // if you encounter new booking date, then create a new BookingDay and put it in the allBookingDays array
        }
        
        function calculateAvailableTimes() {
            // enact algorithm, which will fill the availableTimes array of all BookingDays in allBookingDays array
            // also gives us disabledDates array
        }

        loadBookings();
        calculateAvailableTimes();
        
    }

    function loadAndRenderTimes() {
        console.log("loading times from selected date");

        if (disabledDates.includes(selectedDate)) {
            // throw an error
        }
        else if (availableDates.includes(selectedDate)) {
            // selectedBookingDay = allBookingDays.get(selectedDate.toDateString());
            // check that this booking day was found
            

        }
        else {

        }

        return (
            <></>
        );
    }

    function isSameDay(a, b) {
        // from react-calendar recipe docs
        return differenceInCalendarDays(a, b) === 0;
    }

    function tileDisabled({ date, view }) {
        // from react-calendar recipe docs
        // Disable tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of disabled dates
            return disabledDates.find(dDate => isSameDay(dDate, date));
        }
    }

    function handleChange(nextDate) {
        setDate(nextDate);
    }

    function switchRender() {
        setRenderPicker(!renderPicker);
        console.log(renderPicker);
        console.log(selectedDate);
    }

    function handleSubmit() {
        // get time slot selected
        // post to database to insert booking, need uID (userID), pID (partnerID), sID (serviceID). bID will be auto generated in db (?)
    }

    prepareBookings();

    if (renderPicker) {
        return (
            <div>
                <div>DATE</div>
                <div className="flex flex-row gap-3">
                    <Calendar
                        minDate={today}
                        onChange={handleChange}
                        value={selectedDate}
                        tileDisabled={tileDisabled}
                        className="custom-calendar" />
                </div>
                <div>
                    <button onClick={switchRender} className="custom-button">OK</button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-row gap-3">
                <button onClick={switchRender} className="custom-button">Go back</button><br /><br />
                <div>TIME</div><br />
                list of {selectedDate.toLocaleDateString()} timeslots here...<br /><br />
                {}
                <button onClick={handleSubmit} className="custom-button">Submit</button>
            </div>
        );
    }
}

export default UserCalendar;