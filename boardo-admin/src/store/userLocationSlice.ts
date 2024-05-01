import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

const initialState: Coordinates = {
  latitude: 0,
  longitude: 0,
};

export const userDataSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setUserLocationCoordinates: (state, action: PayloadAction<Coordinates>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const getUserLocationCoordinates = (state: RootState) =>
  state.userLocation;

export const { setUserLocationCoordinates } = userDataSlice.actions;

export default userDataSlice.reducer;
