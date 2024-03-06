import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketData: localStorage.getItem("ticketData")
    ? JSON.parse(localStorage.getItem("ticketData"))
    : null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets.ticketData = action.payload?.data;
      localStorage.setItem("ticketData", JSON.stringify(action.payload?.data));
    },
  },
});

export const { setTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
