export interface Place {
  _id: string;
  LandlordId: string;
  PlaceTitle: string;
  PlaceDescription: string;
  ImageUrl: string;
  Rating: number;
  Coordinates: {
    Latitude: number;
    Longitude: number;
  };
  Facilities: {
    RoomType: string;
    NoOfBeds: number;
    WashRoomType: Array<string>;
    OfferingMeals: boolean;
    Facilities: Array<string>;
    Payment: string;
  };
  Cost: number;
  status: Status;
}

// declare new enum type Status
export enum Status {
  AVAILABLE = "AVAILABLE",
  PENDING = "PENDING",
  RESERVED = "RESERVED",
}

export interface Position {
  Latitude: number;
  Longitude: number;
}
