import { apiSlice } from "./apiSlice";

const TICKETS_ENDPOINT = "/tickets";

export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => ({
        url: TICKETS_ENDPOINT,
        method: "GET",
      }),
    }),
    createTickets: builder.mutation({
      query: (data) => ({
        url: TICKETS_ENDPOINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const { useGetTicketsQuery, useCreateTicketsMutation } = ticketApiSlice;
