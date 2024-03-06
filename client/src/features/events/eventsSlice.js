import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventsData: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events.eventsData = action.payload?.data;
    },
    removeEvents: (state) => {
      state.events.eventsData = null;
    },
  },
});

export const { setEvents, removeEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
