import { createSlice } from "@reduxjs/toolkit";
// project imports

// action - state management
import * as actionTypes from "./actions";

interface CustomizationState {
  isOpen: string[];
  defaultId: string;
  opened: boolean;
  count: number;
}

export const initialState: CustomizationState = {
  isOpen: [], // for active default menu
  defaultId: "default",
  opened: true,
  count: 0,
};

export const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    [actionTypes.MENU_OPEN]: (state, action) => {
      const id = action.payload;
      state.isOpen = [id];
    },
    [actionTypes.SET_MENU]: (state, action) => {
      state.opened = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  [actionTypes.MENU_OPEN]: menuOpen,
  [actionTypes.SET_MENU]: setMenu,
} = customizationSlice.actions;

export default customizationSlice.reducer;
