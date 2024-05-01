export interface Place {
  _id: string;
  userId: string;
  name: string;
  description: string;
  imageUrls: string;
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
    paymentType: string;
  };
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

