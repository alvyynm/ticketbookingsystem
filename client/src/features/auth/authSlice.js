import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.auth.user = user;
      state.auth.token = accessToken;
      // FIXME: DELETE LATER
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(accessToken));
    },
    removeCredentials: (state, action) => {
      state.auth.user = null;
      state.auth.token = null;
      // FIXME: DELETE LATER
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

// Selectors to be used

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
