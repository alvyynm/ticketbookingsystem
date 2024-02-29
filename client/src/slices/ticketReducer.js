import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketData: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.ticketData = action.payload?.data;
      localStorage.setItem("ticketData", JSON.stringify(action.payload?.data));
    },
  },
});
export const { setTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
