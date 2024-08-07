import moment from "moment";
class Booking {
    bookingDate: Date;
    bookingStartTime: Date;
    bookingEndTime: Date;
    bookingDuration: number; // in minutes
    bookingID: number;
    userID: number;
    partnerID: number;

    constructor(userID: number, partnerID: number, bookingID: number, bookingStartTime: Date, bookingDuration: number) {
        let bookingDate = bookingStartTime;
        this.userID = userID;
        this.partnerID = partnerID;
        this.bookingID = bookingID;
        this.bookingDate = bookingDate;
        this.bookingStartTime = bookingStartTime;
        this.bookingDuration = bookingDuration;
        this.bookingEndTime = moment(bookingStartTime).add(bookingDuration, 'm').toDate();
    }

    getBookingID() {
        return this.bookingID;
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

    getUserID() {
        return this.userID;
    }

    getPartnerID() {
        return this.partnerID;
    }

    toDateString() {
        return this.bookingDate.toDateString();

    }

}

export default Booking;