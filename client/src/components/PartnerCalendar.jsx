import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const open = {
    days: [1, 2, 3, 4, 5],
    hours: [9, 10, 11, 12, 13, 14, 15, 16, 17]
}

function PartnerCalendar() {

    const today = new Date();
    const date = today.getDate();
    const hours = today.getHours();
    const openDaysOfOperation = open.days.indexOf(day) > -1;
    const openHoursOfOperation = open.hours.indexOf(hour) > -1;
    const message = (openDaysOfOperation && openHoursOfOperation) ? 'Open for Operations' : 'Closed for Operations';

    return (
        <div>
            <div>DATE</div>
            <div className="flex flex-row gap-3">
                <Calendar
                    minDate={today}
                    onChange={handleChange}
                    value={date}
                    tileDisabled={tileDisabled}
                    className="custom-calendar" />
            </div>
            <div>
                <button onClick={hours} className="custom-button">OK</button>
            </div>
        </div>
    );
}

export default PartnerCalendar;