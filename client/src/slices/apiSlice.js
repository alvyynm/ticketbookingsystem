import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_KEY = import.meta.env.VITE_BASE_API_URL;

const baseQuery = fetchBaseQuery({ baseUrl: API_KEY });

export const apiSlice = createApi({
  baseQuery,
  prepareHeaders: (headers, { getState }) => {
    const token = "help";

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  tagTypes: ["User", "Events", "Tickets"],
  endpoints: (builder) => ({}),
});
