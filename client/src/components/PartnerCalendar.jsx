import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function PartnerCalendar() {
    return (
        <div className="flex flex-row gap-3">
            <Calendar className="custom-calendar"/>
        </div>
    );
}

export default PartnerCalendar;