import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_BASE_API_URL;

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const user = localStorage.getItem("userInfo");
      const token = user?.token; // Retrieve the token from local storage
      console.log(token);

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers, // Keep existing headers
          Authorization: token ? `Bearer ${token}` : "", // Add the token if it exists
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const baseQuery = axiosBaseQuery({ baseUrl: API_KEY });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Events", "Tickets"],
  endpoints: (builder) => ({}),
});
