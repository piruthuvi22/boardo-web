import { apiSlice } from "./apiSlice";
import { Feedback } from "data/dataModels";

interface FeedbackRespones extends Feedback {
  message: string;
  data: Feedback[];
}
const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query<Feedback[], string>({
      query: (placeId) => `/feedback/get-feedback/place/${placeId}`,
      providesTags: ["Feedbacks"],
    }),

    getFeedbackByUser: builder.query<
      Feedback,
      { userId: string; placeId: string }
    >({
      query: ({ userId, placeId }) =>
        `/feedback/get-feedback/user/${userId}/place/${placeId}`,
      providesTags: ["Feedback"],
    }),

    addFeedback: builder.mutation<Feedback, Feedback>({
      query: (feedback) => ({
        url: "/feedback/create-feedback",
        method: "POST",
        body: feedback,
      }),
      invalidatesTags: ["Feedbacks", "Feedback"],
    }),

    updateFeedback: builder.mutation<Feedback, Feedback>({
      query: (feedback) => ({
        url: `/feedback/update-feedback/${feedback._id}`,
        method: "PUT",
        body: feedback,
      }),
      invalidatesTags: ["Feedbacks", "Feedback"],
    }),

    deleteFeedback: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/feedback/delete-feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedbacks"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useLazyGetFeedbacksQuery,
  useLazyGetFeedbackByUserQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = extendedApi;
