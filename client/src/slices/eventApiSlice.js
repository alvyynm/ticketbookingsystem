import { apiSlice } from "./apiSlice";

const EVENTS_ENDPOINT = "/events";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: EVENTS_ENDPOINT,
        method: "GET",
      }),
    }),
    getEventById: builder.query({
      query: (id) => ({
        url: `EVENTS_ENDPOINT/${id}`,
        method: "GET",
      }),
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: EVENTS_ENDPOINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `EVENTS_ENDPOINT${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `EVENTS_ENDPOINT${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApiSlice;
