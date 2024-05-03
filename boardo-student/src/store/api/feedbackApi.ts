import { apiSlice } from "./apiSlice";
import { Feedback } from "data/dataModels";

interface FeedbackRespones extends Feedback {
  message: string;
  data: Feedback[];
}
const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query<Feedback[], string>({
      query: (placeId) => `/feedback/get-feedback/${placeId}`,
      providesTags: ["Feedback"],
    }),

    addFeedback: builder.mutation<Feedback, Feedback>({
      query: (feedback) => ({
        url: "/feedback/create-feedback",
        method: "POST",
        body: feedback,
      }),
      invalidatesTags: ["Feedback"],
    }),

    updateFeedback: builder.mutation<Feedback, Feedback>({
      query: (feedback) => ({
        url: `/feedback/update-feedback/${feedback._id}`,
        method: "PUT",
        body: feedback,
      }),
      invalidatesTags: ["Feedback"],
    }),

    deleteFeedback: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/feedback/delete-feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useLazyGetWishListQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = extendedApi;
