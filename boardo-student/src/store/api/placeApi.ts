import { apiSlice } from "./apiSlice";
import { Place, Position } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNearestPlaces: builder.query<
      Place[],
      {
        latitude: number;
        longitude: number;
        radius: number;
      }
    >({
      query: ({ latitude, longitude, radius }) =>
        `/places/get-nearest-places?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
      providesTags: ["Place"],
    }),
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

export const {
  useLazyGetAllPlacesQuery,
  useLazyGetPlaceByIdQuery,
  useLazyGetNearestPlacesQuery,
} = extendedApi;
