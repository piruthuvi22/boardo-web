import { apiSlice } from "./apiSlice";
import { Place } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query<Place[], string>({
      query: (email) => `/wishlist/get-wishlist/${email}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetWishListQuery } = extendedApi;
