import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventsData: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload?.data;
    },
    removeEvents: (state, action) => {
      state.events = null;
    },
  },
});
export const { setEvents, removeEvents } = eventSlice.actions;
export default eventSlice.reducer;
