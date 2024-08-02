import Booking from "./Booking.ts";

class BookingCardUserInfo extends Booking {

    serviceName: String;
    userFirstName: String;
    userLastName: String;
    userEmail: String;

    constructor(bookingID: number, bookingStartTime: Date, bookingDuration: number, serviceName: String, userFirstName: String, userLastName: String, userEmail: String) {
        super(bookingID, bookingStartTime, bookingDuration);
        this.serviceName = serviceName;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
    }

    getServiceName() {
        return this.serviceName;
    }

    getUserFullName() {
        return this.userFirstName+" "+this.userLastName;
    }

    getUserEmail() {
        return this.userEmail;
    }

}

export default BookingCardUserInfo;