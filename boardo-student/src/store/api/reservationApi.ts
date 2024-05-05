import { Reservation, ReservationsDateRange, ReservationsOfUser } from "data/dataModels";
import { apiSlice } from "./apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservationsDateRange: builder.query<ReservationsDateRange[], string>({
      query: (placeId) => ({
        url: `/reservation/get-reservations/place/${placeId}`,
      }),
      providesTags: ["Enquiry"],
    }),

    getReservationsByUser: builder.query<ReservationsOfUser[], string>({
      query: (userId) => ({
        url: `/reservation/get-reservations/user/${userId}`,
      }),
      providesTags: ["Enquiry"],
    }),

    reservePlace: builder.mutation<Reservation, Reservation>({
      query: (reservation) => ({
        url: `/reservation/new-reservation/`,
        method: "POST",
        body: reservation,
      }),
      invalidatesTags: ["Enquiry"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useReservePlaceMutation,
  useLazyGetReservationsByUserQuery,
  useLazyGetReservationsDateRangeQuery,
} = extendedApi;
