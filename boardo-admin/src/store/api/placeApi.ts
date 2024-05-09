import { create } from "domain";
import { apiSlice } from "./apiSlice";
import { Place } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlacesOfUser: builder.query<Place[], string>({
      query: (userId) => `/places/get-places/user/${userId}`,
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
  useLazyGetPlacesOfUserQuery,
  useLazyGetPlaceByIdQuery,
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
} = extendedApi;
