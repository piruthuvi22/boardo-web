import { apiSlice } from "./apiSlice";
import { Reservation } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query<Reservation[], string>({
      query: (adminId) => `/reservation/get-reservation/${adminId}`,
      providesTags: ["Reservations"],
    }),
    updateStatus: builder.mutation<Reservation,{reservationId:string, status:string}>({
      query: ({reservationId,status}) => ({
        url: `/reservation/update-status/${reservationId}`,
        method: "PUT",
        body: {status},
      }),
      invalidatesTags: ["Reservations"],
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetReservationsQuery, useUpdateStatusMutation } = extendedApi;
