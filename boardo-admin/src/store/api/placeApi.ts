import { create } from "domain";
import { apiSlice } from "./apiSlice";
import { Place, Position } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaces: builder.query<Place[], Position>({
      query: ({ latitude, longitude }) =>
        `/places/get-places?latitude=${latitude}&longitude=${longitude}`,
      providesTags: ["Places"],
    }),
    getPlaceById: builder.query<Place, string>({
      query: (id) => `/places/get-place/${id}`,
    }),
    createPlace: builder.mutation<Place, Place>({
      query: (newPlace) => ({
        url: "/places/create-place",
        method: "POST",
        body: newPlace,
      }),
      invalidatesTags: ["Places"],
    }),
    updatePlace: builder.mutation<Place, Place>({
      query: (updatedPlace) => ({
        url: `/places/update-place/${updatedPlace._id}`,
        method: "PUT",
        body: updatedPlace,
      }),
      invalidatesTags: ["Places"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllPlacesQuery,
  useLazyGetPlaceByIdQuery,
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
} = extendedApi;
