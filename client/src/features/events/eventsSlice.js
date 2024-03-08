import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events:
    localStorage.getItem("events") !== undefined
      ? localStorage.getItem("events")
      : null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload?.data;
      localStorage.setItem("events", JSON.stringify(action.payload?.data));
    },
    removeEvents: (state) => {
      state.events = null;
      localStorage.removeItem("events");
    },
  },
});

export const { setEvents, removeEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
