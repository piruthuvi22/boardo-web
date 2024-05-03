import { string } from "prop-types";
import { apiSlice } from "./apiSlice";
import { User } from "data/dataModels";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, User>({
      query: (user) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
    }),
    updateProfile: builder.mutation<User, User>({
      query: (user) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: user,
      }),
    }),
    getUserByEmail: builder.query<User, {email: string,userRole: string}>({
      query: ({email, userRole}) => `/users/get-user-by-email/${email}/${userRole}`,
    }),
  }),
  overrideExisting: true,
});

export const { useRegisterMutation, useUpdateProfileMutation, useLazyGetUserByEmailQuery } = extendedApi;
