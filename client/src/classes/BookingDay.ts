import Booking from "./Booking";

class BookingDay {
    date: String;
    bookings: Booking[];
    availableTimes: Date[];
    

    constructor(date) {
        this.date = date;
        this.bookings = [];
        this.availableTimes = [];
    }

    insertBooking(booking: Booking) {
        if (booking.bookingDate === this.date) {
            this.bookings.push(booking);
        }
    }

    insertAvailableTime(time: Date) {
        if (time.toDateString() === this.date) {
            this.availableTimes.push(time);
        }
    }

}

export default BookingDay;