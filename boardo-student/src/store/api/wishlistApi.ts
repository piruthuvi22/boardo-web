import { apiSlice } from "./apiSlice";
import { Place } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query<Place[], string>({
      query: (userId) => `/wishlist/get-wishlist/user/${userId}`,
      providesTags: ["Wishlist"],
    }),

    addRemoveWishList: builder.mutation<
      boolean,
      { userId: string; placeId: string }
    >({
      query: (place) => ({
        url: `/wishlist/add-remove-wishlist`,
        method: "POST",
        body: place,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    getStatus: builder.query<boolean, { userId: string; placeId: string }>({
      query: ({ userId, placeId }) =>
        `/wishlist/get-status?placeId=${placeId}&userId=${userId}`,
      providesTags: ["Wishlist"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetWishListQuery,
  useAddRemoveWishListMutation,
  useLazyGetStatusQuery,
} = extendedApi;
