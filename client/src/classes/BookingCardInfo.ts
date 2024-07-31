import Booking from "./Booking";

class BookingCardInfo extends Booking {
    serviceDescription: String;
    serviceName: String;
    serviceCost: number;
    businessName: String;

    constructor(bookingStartTime: Date, bookingDuration: number) {
        super(bookingStartTime, bookingDuration);
        
    }

}

export default BookingCardInfo;