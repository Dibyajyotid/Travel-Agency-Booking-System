export interface Package {
    _id: string;
    title: string;
    description: string;
    price: number;
    availableDates: string[];
    image: string;
}
  
  export interface Booking {
    name: string;
    email: string;
    phoneNumber: string;
    numberOfTravellers: number;
    price: number;
    specialRequests?: string;
}
  