class Booking {
    bookingDate: String; // uses toDateString() format from Date
    bookingStartTime: Date;
    bookingEndTime: Date;
    bookingDuration: number;

    constructor(bookingDate, bookingStartTime, bookingDuration) {
        this.bookingDate = bookingDate;
        this.bookingStartTime = bookingStartTime;
        this.bookingDuration = bookingDuration;
        this.bookingEndTime = bookingStartTime + bookingDuration;
    }

}

export default Booking;