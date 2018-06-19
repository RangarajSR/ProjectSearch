export interface IfDetails {
    id: number;
    fare: string;
    flightName: string;
    departDetails: DepartDetails;
    returnDetails: ReturnDetails;
}

export interface DepartDetails {
    flightNum: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    departureDate: string;
}

export interface ReturnDetails {
    flightNum: string;
    departureTime: string;
    arrivalTime: string;
    returnDate: string;
}

export interface IfDetailsHeader {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    isOneWay: boolean;
}
