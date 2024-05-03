import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "env";

const baseQuery = fetchBaseQuery({
  baseUrl: env.API,
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Place", "Feedback", "User"],
});
