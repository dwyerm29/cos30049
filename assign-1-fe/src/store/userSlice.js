import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.value += 1;
      state.user_id = action.payload.user_id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearUser: (state) => {
      state.user_id = 0;
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
