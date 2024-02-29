import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_KEY = import.meta.env.VITE_BASE_API_URL;

const baseQuery = fetchBaseQuery({ baseUrl: API_KEY });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Events", "Tickets"],
  endpoints: (builder) => ({}),
});
