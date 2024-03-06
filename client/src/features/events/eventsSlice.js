import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload?.data;
    },
    removeEvents: (state) => {
      state.events = null;
    },
  },
});

export const { setEvents, removeEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
