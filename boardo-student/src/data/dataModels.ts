export interface Place {
  _id: string;
  userId: string;
  name: string;
  description: string;
  address: string;
  imageUrls: Array<{ url: string; name: string; fileRef: string }>;
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  facilities: {
    roomType: string;
    noOfBeds: number;
    washRoomType: Array<string>;
    facilities: Array<string>;
  };
  paymentType: string;
  cost: number;
  status: Status;
}

// declare new enum type Status
export enum Status {
  AVAILABLE = "AVAILABLE",
  PENDING = "PENDING",
  RESERVED = "RESERVED",
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  userRole?: string;
  phoneNumber?: string;
  province?: string;
  district?: string;
}

export interface Feedback {
  _id?: string;
  email: string;
  placeId: string;
  userName: string;
  userImage: string;
  timestamp: string;
  rating: number;
  comment: string;
}

export interface Reservation {
  _id?: string;
  adminId?: string;
  userId: string;
  placeId: string;
  checkIn: string;
  checkOut: string;
  noOfGuests: number;
}

export interface ReservationsDateRange {
  _id: string;
  placeId: string;
  checkIn: string;
  checkOut: string;
}
