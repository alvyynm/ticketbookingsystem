import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, removeCredentials } from "../slices/authSlice";
const API_URL = import.meta.env.VITE_BASE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = JSON.parse(getState().auth.token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Events", "Tickets"],
  endpoints: (builder) => ({}),
});
