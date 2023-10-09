import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload.cart;
      state.totalPrice = action.payload.totalPrice;
      console.log(action.payload);
    },
    addToCart: (state, action) => {
      let isDuplicate = false;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].token_id === action.payload.token_id) {
          isDuplicate = true;
        }
      }
      if (!isDuplicate) {
        state.cart.push(action.payload);
      }

      state.totalPrice = 0;
      for (const item of state.cart) {
        state.totalPrice += item.selling_price;
      }

      //update the browser's local storage to cart contents survive refresh
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
        })
      );
    },

    removeFromCart: (state, action) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].token_id === action.payload) {
          state.cart.splice(i, 1);
        }
      }

      state.totalPrice = 0;
      for (const item of state.cart) {
        state.totalPrice += item.selling_price;
      }

      //update the browser's local storage to cart contents survive refresh
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state.cart,
        })
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
