import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from "data/dataModels";

const initialState: User = {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  userRole: "",
  phoneNumber: "",
  province: "",
  district: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userRole = action.payload.userRole;
      state.phoneNumber = action.payload.phoneNumber;
      state.province = action.payload.province;
      state.district = action.payload.district;
    },
  },
});

export const getUserInfo = (state: RootState) => state.userInfo;

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
