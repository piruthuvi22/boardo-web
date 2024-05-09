import { apiSlice } from "./apiSlice";
import { Place, Position, SearchFilters } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNearestPlaces: builder.query<Place[], SearchFilters>({
      query: ({
        placeName,
        minBudget,
        maxBudget,
        rating,
        radius,
        paymentType,
        placeDescription,
        latitude,
        longitude,
      }) => ({
        url: `/places/get-nearest-places`,
        // Check whether the query params contain a value or not. If not, don't include it in the query params
        params: {
          ...(placeName && { placeName }),
          ...(minBudget && { minBudget }),
          ...(maxBudget && { maxBudget }),
          ...(rating && { rating }),
          ...(radius && { radius }),
          ...(paymentType && { paymentType }),
          ...(placeDescription && { placeDescription }),
          latitude,
          longitude,
        },
      }),
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
