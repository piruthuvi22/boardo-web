import { configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./customizationReducer";
import { apiSlice } from "store/api/apiSlice";
import userDataSlice from "./userLocationSlice";
import counterSlice from "./counterClice";

// ==============================|| REDUX - MAIN STORE ||============================== //

export const store = configureStore({
  reducer: {
    customization: customizationReducer,
    userLocation: userDataSlice,
    counter: counterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch