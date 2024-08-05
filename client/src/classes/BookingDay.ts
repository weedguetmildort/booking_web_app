import Booking from "./Booking";

class BookingDay {
    date: Date;
    bookings: Booking[];
    availableTimes: Date[];


    constructor(date: Date) {
        this.date = date;
        this.bookings = [];
        this.availableTimes = [];
    }

    insertBooking(booking: Booking) {
        if (booking.bookingDate.toDateString() === this.date.toDateString()) {
            this.bookings.push(booking);
        }
        else {
            console.log(booking.bookingDate.toISOString() + " not pushed!")
        }
    }

    insertAvailableTime(time: Date) {
        if (time.toDateString() === this.date.toDateString()) {
            this.availableTimes.push(time);
        }
        else {
            console.log("inserting available time failed");
        }
    }

    getBookings() {
        return this.bookings;
    }

    getAvailableTimes() {
        return this.availableTimes;
    }

}

export default BookingDay;