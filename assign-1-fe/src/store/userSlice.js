import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    wallet_id: 0,
  },
  reducers: {
    setStoreUser: (state, action) => {
      state.value += 1;
      state.user_id = action.payload.user_id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.wallet_id = action.payload.wallet_id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStoreUser } = userSlice.actions;

export default userSlice.reducer;
