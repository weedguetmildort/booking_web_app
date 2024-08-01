import Booking from "./Booking.js";

class BookingCardUserInfo extends Booking {

    serviceName: String;
    serviceDescription: String;
    userFirstName: String;
    userLastName: String;
    userEmail: String;

    constructor(bookingID: number, bookingStartTime: Date, bookingDuration: number, serviceName: String, serviceDescription: String, userFirstName: String, userLastName: String, userEmail: String) {
        super(bookingID, bookingStartTime, bookingDuration);
        this.serviceName = serviceName;
        this.serviceDescription = serviceDescription;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
    }

    getServiceName() {
        return this.serviceName;
    }

    getServiceDescription() {
        return this.serviceDescription;
    }

    getUserFullName() {
        return this.userFirstName+" "+this.userLastName;
    }

    getUserEmail() {
        return this.userEmail;
    }

}

export default BookingCardUserInfo;