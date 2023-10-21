import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

//Redux store used for storing data that is needed in multiple places (current user and shopping cart)
export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
