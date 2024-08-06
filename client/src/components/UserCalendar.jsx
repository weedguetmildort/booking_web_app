import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { differenceInCalendarDays, milliseconds } from 'date-fns';
import BookingLightweight from "classes/BookingLightweight.ts";
import BookingDay from "classes/BookingDay.ts";
import moment from "moment";
import Dropdown from 'react-dropdown';
import 'react-calendar/dist/Calendar.css';
import 'react-dropdown/style.css';
import axios from "axios";


// temp
const partnerID1 = 2;

function UserCalendar() {
  console.log("func exec");

  const today = new Date();
  const tomorrow = moment(today).add(1, 'd').toDate();
  // following values are temp
  const twentySeventh = new Date(2024, 6, 27); // month zero indexed
  const allBookingDays = new Map(); // key: date in toDateString, value: corresponding BookingDay

  const thisServiceDuration = 60;

  let availableDates = []; // must be array of toDateString strings
  const [hoursOfOperation, setHoursOfOperation] = useState([]);
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
  const [renderSubmitMessageStatus, setRenderSubmitMessageStatus] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const [submitMessage, setSubmitMessage] = useState("Loading...");



  useEffect(() => {
    const getHoursOfOperation = async (partnerID) => {
      try {
        const response = await axios.get(`http://localhost:5002/db/api/getHours/${partnerID}`);
        console.log('Response:', response);
        return response;
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
          console.log('Error Response:', error.response);
        }
      }
    }

    const prepHoursOfOperation = async () => {
      const response = await getHoursOfOperation(partnerID1).then(result => result.data);
      console.log(response);

      if (response.data.length !== 0) {
        let tempHoursOfOperation = [-1, -1, -1, -1, -1, -1, -1];

        for (let i = 0; i < tempHoursOfOperation.length; i++) {
          for (let j = 0; j < response.data.length; j++) {
            if (response.data[j].day === i) {
              tempHoursOfOperation[i] = [response.data[j].open, response.data[j].close];
            }
          }
        }

        for (let dow = 0; dow < tempHoursOfOperation.length; dow++) {
          if (tempHoursOfOperation[dow] === -1) {
            disabledHoursOfOperation.push(dow);
          }
        }

        setHoursOfOperation(tempHoursOfOperation);
      }
      else {
        console.log("response data was empty!");
      }
    }

    prepHoursOfOperation();

  }, [])



  useEffect(() => {
    function parseUTCString(dateTimeString) {

      let year = parseInt(dateTimeString.substring(0,4));
      let month = parseInt(dateTimeString.substring(5,7));
      let day = parseInt(dateTimeString.substring(8,10));
      let hour = parseInt(dateTimeString.substring(11,13));
      let minute = parseInt(dateTimeString.substring(14,16));
      let second = parseInt(dateTimeString.substring(17,19));
      let millisecond = parseInt(dateTimeString.substring(20,23));

      return new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
    }

    const getAllBookings = async (partnerID, startTime) => {
      try {
        const response = await axios.post('http://localhost:5002/db/api/getFutureBookings', { pID: partnerID, startTime: startTime });
        console.log('Response:', response);
        return response;
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
          console.log('Error Response:', error.response);
        }
      }
    }

    const prepBookings = async () => {
      const response = await getAllBookings(partnerID1, getTomorrowTime()).then(result => result.data);
      console.log('BOOKINGS');
      console.log(response.data);

      if (response.data.length !== 0) {

        const tempAllBookings = response.data.map((object) => new BookingLightweight(object.bID, parseUTCString(object.starttime), object.duration));

        for (let i = 0; i < tempAllBookings.length; i++) {

        }

      }
      else {
        console.log("response data was empty!");
      }

    }

    prepBookings();
  }, [])



  const enableOKButton = () => {
    setOKDisabled(false);
  };


  const enableSubmitButton = () => {
    setSubmitDisabled(false);
  };



  function minutesDiff(dateTimeValue2, dateTimeValue1) {
    // https://www.tutorialspoint.com/how-to-calculate-minutes-between-two-dates-in-javascript
    let differenceValue = (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
    differenceValue /= 60;
    return Math.abs(Math.round(differenceValue));
  }

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

    const tomorrow = new Date(moment(today).add(1, 'd'));
    tomorrow.setHours(0, 0, 0, 0);
    console.log(tomorrow);
    const tomorrowTime = formatDateToUTC(tomorrow);
    console.log(tomorrowTime);
    return tomorrowTime;
  }


  function calculateCalendar() {

    // after query backend api and accepting the json, make Booking objects
    // if you encounter new booking date, then create a new BookingDay and put it in the allBookingDays map
    // enact algorithm, which will fill the availableTimes array of all BookingDays in allBookingDays map
    // also gives us disabledDates array

    // atp we can now work in the local time

    for (let [key, value] of allBookingDays) {
      // first find the day of the week of this BookingDay and the corresponding open/close times
      console.log("value");
      console.log(value);

      let thisDayBookings = value.getBookings();

      const date = new Date(value.date);
      const dow = date.getDay();

      const dayMinutes = hoursOfOperation[dow];

      console.log("HOURS OF OPERATION: ");
      console.log(hoursOfOperation);

      // dayOpens and dayCloses should be in local time
      let dayOpens = new Date();
      let dayCloses = new Date();

      if (dayMinutes[0] !== -1) {
        dayOpens = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, dayMinutes[0]);
        dayCloses = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, dayMinutes[1]); 
      }

      // actual alg

      // first, just the space between START and first booking is evaluated


      let firstBooking = new Date(null);
      if (thisDayBookings !== undefined || thisDayBookings.length != 0) {
        firstBooking = new Date(thisDayBookings[0].bookingDate);
      }
      else {
        console.log('if a booking day was made there should be at least 1 booking, check your loading code')
      }

      console.log('e');
      let timeToCheck = dayOpens;
      let gap = minutesDiff(firstBooking, dayOpens);
      while (gap >= thisServiceDuration) {
        console.log(timeToCheck);
        value.insertAvailableTime(timeToCheck);
        timeToCheck = new Date(moment(timeToCheck).add(thisServiceDuration, 'minutes'));
        gap = minutesDiff(firstBooking, timeToCheck);
      }

      // // next, the spacing between bookings. the end of first booking and the start of the one next.
      console.log('ee');

      for (let i = 0; i < thisDayBookings.length - 1; i++) {

        let timeToCheck = thisDayBookings[i].bookingEndTime;
        let endingTimeToCheck = thisDayBookings[i + 1].bookingStartTime;

        let gap = minutesDiff(endingTimeToCheck, timeToCheck);

        while (gap >= thisServiceDuration) {
          console.log(timeToCheck);
          value.insertAvailableTime(timeToCheck);
          timeToCheck = new Date(moment(timeToCheck).add(thisServiceDuration, 'minutes'));
          gap = minutesDiff(endingTimeToCheck, timeToCheck);
        }

      }

      // // lastly, the gap between the day's end time and the latest bookings end time is evaluated
      console.log('eee');

      timeToCheck = thisDayBookings[thisDayBookings.length - 1].bookingEndTime;
      gap = minutesDiff(dayCloses, timeToCheck);
      while (gap >= thisServiceDuration) {
        value.insertAvailableTime(timeToCheck);
        timeToCheck = new Date(moment(timeToCheck).add(thisServiceDuration, 'minutes'));
        gap = minutesDiff(dayCloses, timeToCheck);
      }


      let thisAvailableTimes = value.getAvailableTimes();
      if (thisAvailableTimes.length === 0) {
        disabledDates.push(value.date);
      }
      else {
        availableDates.push(value.date.toDateString());
      }

      // display
      // console.log("times available: "+thisAvailableTimes.length);

      // for (let i = 0; i < thisAvailableTimes.length; i++) {
      //     console.log(thisAvailableTimes[i])
      // }

      console.log("disabledDates");
      for (let i = 0; i < disabledDates.length; i++) {
        console.log(disabledDates.at(i));
      }

    }

  }



  function loadTimes() {

    if (disabledDates.includes(selectedDate)) { // days with bookings with no slots
      console.log("the selected date... wasnt supposed to be selectable.");
    }
    else if (availableDates.includes(selectedDate.toDateString())) { // days with bookings that still have slots
      let selectedBookingDay = allBookingDays.get(selectedDate.toDateString());
      tempSelectedAvailableTimes = selectedBookingDay.getAvailableTimes();
      defaultOption = tempSelectedAvailableTimes[0];
    }
    else { // days without bookings. the available times will be all between open and close

      const dow = selectedDate.getDay();
      const dayHours = hoursOfOperation[dow];

      // dayOpens and dayCloses should be in local time
      let dayOpens = new Date();
      let dayCloses = new Date();

      if (dayHours[0] !== -1) {
        dayOpens = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), dayHours[0]);
        dayCloses = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), dayHours[1]);
      }

      let timeToCheck = dayOpens;
      let endingTimeToCheck = dayCloses;

      let gap = minutesDiff(endingTimeToCheck, timeToCheck);

      while (gap >= thisServiceDuration) {
        tempSelectedAvailableTimes.push(timeToCheck);
        timeToCheck = new Date(moment(timeToCheck).add(thisServiceDuration, 'minutes'));
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
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of disabled dates

      if (disabledHoursOfOperation.includes(date.getDay())) {
        disabledDates.push(date);
      }

      return disabledDates.find(dDate => isSameDay(dDate, date));
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

    setSelectedTimeDate(selectedAvailableTimes.find(aTime => isSameTime(aTime.toLocaleTimeString('en-US', { hour: "numeric", minute: "2-digit" }), selectedTime.value)));

    setSubmitMessage("Success!");

    // get time slot selected
    // post to database to insert booking, need uID (userID), pID (partnerID), sID (serviceID). bID will be auto generated in db (?)

    // based on the success of the post function, display a success or 
  }



  console.log("AHH");
  const arrayDataItems = selectedAvailableTimes.map((time) => time.toLocaleTimeString('en-US', { hour: "numeric", minute: "2-digit" }));
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
            className="custom-calendar" />
        </div>
        <div>
          <button onClick={switchRender} disabled={isOKDisabled} className="custom-button">OK</button>
        </div>
      </div>
    );
  }
  else if (!renderPicker && renderSubmitMessageStatus) {
    return (
      <div className="flex flex-row gap-3">
        {submitMessage} <br />
        {selectedTimeDate.toLocaleString()}
      </div>
    );
  }
  else {
    return (
      <div className="flex flex-row gap-3">
        <button onClick={switchRender} className="custom-button">Go back</button><br /><br />
        {selectedDate.toDateString()}<br /><br />

        <div>Select a time slot from the dropdown.</div><br />

        {/* <ul>{arrayDataItems}</ul><br /><br /> */}

        <Dropdown
          options={arrayDataItems}
          onChange={handleTimeChange}
          value={selectedTime}
          defaultOption={arrayDataItems[0]}
          placeholder="Select an option" /><br /><br />

        <button onClick={handleSubmit} disabled={isSubmitDisabled} className="custom-button">Submit</button>
      </div>

    );
  }
}

export default UserCalendar;