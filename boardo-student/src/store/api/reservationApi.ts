import { Reservation, ReservationsDateRange } from "data/dataModels";
import { apiSlice } from "./apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservationsDateRange: builder.query<ReservationsDateRange[], string>({
      query: (placeId) => ({
        url: `/reservation/get-reservations/place/${placeId}`,
      }),
    }),

    reservePlace: builder.mutation<Reservation, Reservation>({
      query: (reservation) => ({
        url: `/reservation/new-reservation/`,
        method: "POST",
        body: reservation,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useReservePlaceMutation, useLazyGetReservationsDateRangeQuery } =
  extendedApi;
