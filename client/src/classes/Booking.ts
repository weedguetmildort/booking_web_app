import moment from "moment";
class Booking {
    bookingDate: Date;
    bookingStartTime: Date;
    bookingEndTime: Date;
    bookingDuration: number; // in minutes

    constructor(bookingStartTime: Date, bookingDuration: number) {
        let bookingDate = bookingStartTime;
        this.bookingDate = bookingDate;
        this.bookingStartTime = bookingStartTime;
        this.bookingDuration = bookingDuration;
        this.bookingEndTime = moment(bookingStartTime).add(bookingDuration, 'm').toDate();
    }

    getBookingDate() {
        return this.bookingDate;
    }

    getBookingStartTime() {
        return this.bookingStartTime;
    }

    getBookingDuration() {
        return this.bookingDuration;
    }

    getBookingEndTime() {
        return this.bookingEndTime;
    }
    
}

export default Booking;