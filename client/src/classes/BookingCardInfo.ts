import Booking from "./Booking";

class BookingCardInfo extends Booking {
    
    serviceName: String;
    serviceCost: number;
    serviceDescription: String;
    businessName: String;

    constructor(bookingStartTime: Date, bookingDuration: number, serviceName: String, serviceCost: number, serviceDescription: String, businessName: String) {
        super(bookingStartTime, bookingDuration);
        this.serviceName = serviceName;
        this.serviceCost = serviceCost;
        this.serviceDescription = serviceDescription;
        this.businessName = businessName;
    }

    getServiceName() {
        return this.serviceName;
    }

    getServiceCost() {
        return this.serviceCost;
    }

    getServiceDescription() {
        return this.serviceDescription;
    }

    getBusinessName() {
        return this.businessName;
    }

}

export default BookingCardInfo;