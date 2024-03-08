import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
  name: localStorage.getItem("name") ? localStorage.getItem("name") : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, name } = action.payload;
      state.auth = { user: user, token: accessToken, name: name };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(accessToken));
      localStorage.setItem("name", JSON.stringify(name));
    },
    removeCredentials: (state) => {
      state.auth = { user: null, token: null, name: null };
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

// Selectors to be used

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
