import { apiSlice } from "./apiSlice";
import { Place, Position } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaces: builder.query<Place[], Position>({
      query: ({ latitude, longitude }) =>
        `/places/get-places?latitude=${latitude}&longitude=${longitude}`,
    }),
    getPlaceById: builder.query<Place, string>({
      query: (id) => `/places/get-place/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllPlacesQuery, useLazyGetPlaceByIdQuery } =
  extendedApi;
