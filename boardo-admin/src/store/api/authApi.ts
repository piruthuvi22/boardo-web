import { apiSlice } from "./apiSlice";
import {User} from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, User>({
      query: (user) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
    }),
    updateProfile: builder.mutation<boolean, User>({
        query: (user) => ({
            url: "/users/update-profile",
            method: "PUT",
            body: user,
        }),
        }),
  }),
  overrideExisting: true,
});

export const { useRegisterMutation, useUpdateProfileMutation } = extendedApi;