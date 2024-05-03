import { apiSlice } from "./apiSlice";
import { Reservation } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaceById: builder.query<Reservation, string>({
      query: (adminId) => `/reservation/get-reservation/${adminId}`,
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetPlaceByIdQuery } = extendedApi;
