import Booking from "./Booking.ts";

class BookingCardUserInfo extends Booking {
    
    serviceName: String;
    serviceDescription: String;
    businessName: String;

    constructor(bookingID: number, bookingStartTime: Date, bookingDuration: number, serviceName: String, serviceDescription: String, businessName: String) {
        super(bookingID, bookingStartTime, bookingDuration);
        this.serviceName = serviceName;
        this.serviceDescription = serviceDescription;
        this.businessName = businessName;
    }

    getServiceName() {
        return this.serviceName;
    }

    getServiceDescription() {
        return this.serviceDescription;
    }

    getBusinessName() {
        return this.businessName;
    }

}

export default BookingCardUserInfo;