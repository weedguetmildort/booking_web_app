import React, { useState } from "react";
import Calendar from "react-calendar";
import { differenceInCalendarDays } from "date-fns";
import Booking from "classes/Booking.ts";
import BookingDay from "classes/BookingDay.ts";
import moment from "moment";
import Dropdown from "react-dropdown";
import "react-calendar/dist/Calendar.css";
import "react-dropdown/style.css";

function UserCalendar() {
  const today = new Date();
  const tomorrow = moment(today).add(1, "d").toDate();
  // following values are temp
  const twentySeventh = new Date(2024, 6, 27); // month zero indexed
  const allBookingDays = new Map(); // key: date in toDateString, value: corresponding BookingDay

  const thisServiceDuration = 60;

  let availableDates = []; // must be array of toDateString strings
  let hoursOfOperation = [];
  let disabledDates = []; // temp value
  let disabledHoursOfOperation = [];
  let defaultOption = -1;
  let tempSelectedAvailableTimes = [];

  const [isOKDisabled, setOKDisabled] = useState(true);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  const [selectedDate, setDate] = useState(new Date());
  const [selectedTime, setTime] = useState(new Date());
  const [selectedTimeDate, setSelectedTimeDate] = useState(new Date());
  const [renderPicker, setRenderPicker] = useState(true);
  const [selectedAvailableTimes, setSelectedAvailableTimes] = useState([]);
  const [renderSubmitMessageStatus, setRenderSubmitMessageStatus] =
    useState(false);

  const [submitMessage, setSubmitMessage] = useState("Loading...");

  const enableOKButton = () => {
    setOKDisabled(false);
  };

  const enableSubmitButton = () => {
    setSubmitDisabled(false);
  };

  function minutesDiff(dateTimeValue2, dateTimeValue1) {
    // https://www.tutorialspoint.com/how-to-calculate-minutes-between-two-dates-in-javascript
    let differenceValue =
      (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
    differenceValue /= 60;
    return Math.abs(Math.round(differenceValue));
  }

  function prepHoursOfOperation() {
    // accept the json and load the hours of operation in an array
    // iterate over every day and push the open and the close

    // temp
    hoursOfOperation.push([-1]); // sun disabled
    for (let i = 0; i < 5; i++) {
      // mon thru fri have times 9am-5pm
      hoursOfOperation.push([9, 17]);
    }
    hoursOfOperation.push([-1]); // sat disabled

    for (let dow = 0; dow < hoursOfOperation.length; dow++) {
      if (hoursOfOperation[dow][0] === -1) {
        disabledHoursOfOperation.push(dow);
      }
    }
  }

  function prepareBookings() {
    const getBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/bookings`, {
          method: "GET",
        }).then((res) => res.json());

        // save the above in some variable

        console.log("Status: " + response.status);

        if (response.ok) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getHoursOfOperation = async () => {
      // this needs input of pID
    };

    // after query backend api and accepting the json, make Booking objects
    // if you encounter new booking date, then create a new BookingDay and put it in the allBookingDays map

    // temporary test data, the dates in database will all be UTC

    const duration1 = 30;
    const duration2 = 60;

    const the30thBook1 = new Date(Date.UTC(2024, 6, 30, 14)); // 9 am // new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
    const the30thBook2 = new Date(Date.UTC(2024, 6, 30, 16)); // 11 am

    // two bookings on the 30th, one on the 31st, and a fully booked date on aug 1

    const the31thBook1 = new Date("2024-07-31T17:00:00.000Z"); // noon in our timezone, 5pm in UTC

    let the1st = new Date("2024-08-01T17:00:00.000Z");

    const the30thBookingDay = new BookingDay(the30thBook1);
    const the31thBookingDay = new BookingDay(the31thBook1);
    const the1stBookingDay = new BookingDay(the1st);

    the30thBookingDay.insertBooking(new Booking(the30thBook1, duration1));
    the30thBookingDay.insertBooking(new Booking(the30thBook2, duration2));

    the31thBookingDay.insertBooking(new Booking(the31thBook1, duration1));

    // a fully booked day
    the1stBookingDay.insertBooking(
      new Booking(new Date("2024-08-01T14:00:00.000Z"), duration2)
    );
    the1stBookingDay.insertBooking(
      new Booking(new Date("2024-08-01T15:00:00.000Z"), duration2)
    );
    the1stBookingDay.insertBooking(
      new Booking(new Date("2024-08-01T16:00:00.000Z"), duration2)
    );
    the1stBookingDay.insertBooking(
      new Booking(new Date("2024-08-01T17:00:00.000Z"), duration2)
    );
    the1stBookingDay.insertBooking(
      new Booking(new Date("2024-08-01T18:00:00.000Z"), duration2)
    );
    the1stBookingDay.insertBooking(
      new Booking(new Date("2024-08-01T19:00:00.000Z"), duration2)
    );
    the1stBookingDay.insertBooking(
      new Booking(new Date("2024-08-01T20:00:00.000Z"), duration2)
    );
    the1stBookingDay.insertBooking(
      new Booking(new Date("2024-08-01T21:00:00.000Z"), duration2)
    );

    let testBookings = the30thBookingDay.getBookings();

    allBookingDays.set(
      the30thBookingDay.date.toDateString(),
      the30thBookingDay
    );
    allBookingDays.set(
      the31thBookingDay.date.toDateString(),
      the31thBookingDay
    );
    allBookingDays.set(the1stBookingDay.date.toDateString(), the1stBookingDay);

    prepHoursOfOperation();
    // enact algorithm, which will fill the availableTimes array of all BookingDays in allBookingDays map
    // also gives us disabledDates array

    // atp we can now work in the local time

    for (let [key, value] of allBookingDays) {
      // first find the day of the week of this BookingDay and the corresponding open/close times

      let thisDayBookings = value.getBookings();

      const date = new Date(value.date);
      const dow = date.getDay();

      const dayHours = hoursOfOperation[dow];

      // dayOpens and dayCloses should be in local time
      let dayOpens = new Date();
      let dayCloses = new Date();

      if (dayHours[0] !== -1) {
        dayOpens = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          dayHours[0]
        );
        dayCloses = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          dayHours[1]
        );
      }

      // actual alg

      // first, just the space between START and first booking is evaluated

      let firstBooking = new Date(null);
      if (thisDayBookings !== undefined || thisDayBookings.length != 0) {
        firstBooking = new Date(thisDayBookings[0].bookingDate);
      } else {
        console.log(
          "if a booking day was made there should be at least 1 booking, check your loading code"
        );
      }

      let timeToCheck = dayOpens;
      let gap = minutesDiff(firstBooking, dayOpens);
      while (gap >= thisServiceDuration) {
        value.insertAvailableTime(timeToCheck);
        timeToCheck = new Date(
          moment(timeToCheck).add(thisServiceDuration, "minutes")
        );
        gap = minutesDiff(firstBooking, timeToCheck);
      }

      // next, the spacing between bookings. the end of first booking and the start of the one next.

      for (let i = 0; i < thisDayBookings.length - 1; i++) {
        let timeToCheck = thisDayBookings[i].bookingEndTime;
        let endingTimeToCheck = thisDayBookings[i + 1].bookingStartTime;

        let gap = minutesDiff(endingTimeToCheck, timeToCheck);

        while (gap >= thisServiceDuration) {
          value.insertAvailableTime(timeToCheck);
          timeToCheck = new Date(
            moment(timeToCheck).add(thisServiceDuration, "minutes")
          );
          gap = minutesDiff(endingTimeToCheck, timeToCheck);
        }
      }

      // lastly, the gap between the day's end time and the latest bookings end time is evaluated

      timeToCheck = thisDayBookings[thisDayBookings.length - 1].bookingEndTime;
      gap = minutesDiff(dayCloses, timeToCheck);
      while (gap >= thisServiceDuration) {
        value.insertAvailableTime(timeToCheck);
        timeToCheck = new Date(
          moment(timeToCheck).add(thisServiceDuration, "minutes")
        );
        gap = minutesDiff(dayCloses, timeToCheck);
      }

      let thisAvailableTimes = value.getAvailableTimes();
      if (thisAvailableTimes.length === 0) {
        disabledDates.push(value.date);
      } else {
        availableDates.push(value.date.toDateString());
      }

      // display
      // console.log("times available: "+thisAvailableTimes.length);

      // for (let i = 0; i < thisAvailableTimes.length; i++) {
      //     console.log(thisAvailableTimes[i])
      // }
    }
  }

  function loadTimes() {
    if (disabledDates.includes(selectedDate)) {
      // days with bookings with no slots
      console.log("the selected date... wasnt supposed to be selectable.");
    } else if (availableDates.includes(selectedDate.toDateString())) {
      // days with bookings that still have slots
      let selectedBookingDay = allBookingDays.get(selectedDate.toDateString());
      tempSelectedAvailableTimes = selectedBookingDay.getAvailableTimes();
      defaultOption = tempSelectedAvailableTimes[0];
    } else {
      // days without bookings. the available times will be all between open and close

      const dow = selectedDate.getDay();
      const dayHours = hoursOfOperation[dow];

      // dayOpens and dayCloses should be in local time
      let dayOpens = new Date();
      let dayCloses = new Date();

      if (dayHours[0] !== -1) {
        dayOpens = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          dayHours[0]
        );
        dayCloses = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          dayHours[1]
        );
      }

      let timeToCheck = dayOpens;
      let endingTimeToCheck = dayCloses;

      let gap = minutesDiff(endingTimeToCheck, timeToCheck);

      while (gap >= thisServiceDuration) {
        tempSelectedAvailableTimes.push(timeToCheck);
        timeToCheck = new Date(
          moment(timeToCheck).add(thisServiceDuration, "minutes")
        );
        gap = minutesDiff(endingTimeToCheck, timeToCheck);
      }
    }
    setSelectedAvailableTimes(tempSelectedAvailableTimes);
  }

  function isSameDay(a, b) {
    // from react-calendar recipe docs
    return differenceInCalendarDays(a, b) === 0;
  }

  function isSameTime(a, b) {
    // from react-calendar recipe docs
    return a === b;
  }

  function tileDisabled({ date, view }) {
    // from react-calendar recipe docs, modified
    // Disable tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of disabled dates

      if (disabledHoursOfOperation.includes(date.getDay())) {
        disabledDates.push(date);
      }

      return disabledDates.find((dDate) => isSameDay(dDate, date));
    }
  }

  function handleDateChange(nextDate) {
    setDate(nextDate);
    enableOKButton();
  }

  function handleTimeChange(nextTime) {
    setTime(nextTime);
    console.log(selectedTime);
    enableSubmitButton();
  }

  function switchRender() {
    setRenderPicker(!renderPicker);
    loadTimes();
  }

  function handleSubmit() {
    setRenderPicker(false);
    setRenderSubmitMessageStatus(true);

    setSelectedTimeDate(
      selectedAvailableTimes.find((aTime) =>
        isSameTime(
          aTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
          selectedTime.value
        )
      )
    );

    setSubmitMessage("Success!");

    // get time slot selected
    // post to database to insert booking, need uID (userID), pID (partnerID), sID (serviceID). bID will be auto generated in db (?)

    // based on the success of the post function, display a success or
  }

  prepareBookings();
  const arrayDataItems = selectedAvailableTimes.map((time) =>
    time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  );
  console.log(arrayDataItems);

  if (renderPicker && !renderSubmitMessageStatus) {
    return (
      <div>
        <div>DATE</div>
        <div className="flex flex-row gap-3">
          <Calendar
            minDate={today}
            onChange={handleDateChange}
            value={selectedDate}
            tileDisabled={tileDisabled}
            className="custom-calendar"
          />
        </div>
        <div>
          <button
            onClick={switchRender}
            disabled={isOKDisabled}
            className="custom-button"
          >
            OK
          </button>
        </div>
      </div>
    );
  } else if (!renderPicker && renderSubmitMessageStatus) {
    return (
      <div className="flex flex-row gap-3">
        {submitMessage} <br />
        {selectedTimeDate.toLocaleString()}
      </div>
    );
  } else {
    return (
      <div className="flex flex-row gap-3">
        <button onClick={switchRender} className="custom-button">
          Go back
        </button>
        <br />
        <br />
        {selectedDate.toDateString()}
        <br />
        <br />

        <div>Select a time slot from the dropdown.</div>
        <br />

        {/* <ul>{arrayDataItems}</ul><br /><br /> */}

        <Dropdown
          options={arrayDataItems}
          onChange={handleTimeChange}
          value={selectedTime}
          defaultOption={arrayDataItems[0]}
          placeholder="Select an option"
        />
        <br />
        <br />

        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="custom-button"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default UserCalendar;
