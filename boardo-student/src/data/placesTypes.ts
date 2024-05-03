import {
  FitnessCenter,
  Home,
  Hotel,
  LocalHospital,
  LocalPharmacy,
  LocalPolice,
  Park,
  Restaurant,
  Storefront,
} from "@mui/icons-material";

export const PLACE_TYPES = [
  {
    id: 1,
    name: "Super Market",
    value: "supermarket",
    icon: Storefront,
  },
  {
    id: 2,
    name: "Restaurant",
    value: "restaurant",
    icon: Restaurant,
  },
  {
    id: 3,
    name: "Hospital",
    value: "hospital",
    icon: LocalHospital,
  },
  {
    id: 4,
    name: "Park",
    value: "park",
    icon: Park,
  },
  {
    id: 5,
    name: "Gym",
    value: "gym",
    icon: FitnessCenter,
  },
  {
    id: 6,
    name: "Home Goods",
    value: "home_goods_store",
    icon: Home,
  },
  {
    id: 7,
    name: "Police",
    value: "police",
    icon: LocalPolice,
  },
  
];
