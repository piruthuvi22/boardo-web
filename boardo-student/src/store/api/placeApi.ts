import { env } from "env";
import { apiSlice } from "./apiSlice";
import { Place, Position } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaces: builder.query<Place[], Position>({
      query: ({ Latitude, Longitude }) =>
        `/places/get-places?latitude=${Latitude}&longitude=${Longitude}`,
    }),
    getPlaceById: builder.query<Place, string>({
      query: (id) => `/places/get-place/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllPlacesQuery, useLazyGetPlaceByIdQuery } =
  extendedApi;
