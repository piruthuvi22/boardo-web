import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type SearchPlace = {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  radius?: number;
};

const initialState: SearchPlace = {
  placeName: "",
  address: "",
  latitude: 0,
  longitude: 0,
  radius: 35000,
};

export const searchPlaceSlice = createSlice({
  name: "searchPlace",
  initialState,
  reducers: {
    setSearchPlaceData: (state, action: PayloadAction<SearchPlace>) => {
      state.placeName = action.payload.placeName;
      state.address = action.payload.address;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.radius = action.payload.radius;
    },
  },
});

export const getSearchPlaceData = (state: RootState) => state.searchPlace;

export const { setSearchPlaceData } = searchPlaceSlice.actions;

export default searchPlaceSlice.reducer;
