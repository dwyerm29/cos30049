import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 0,
  },
  reducers: {
    setCart: (state, action) => {
      //console.log(action.payload);
      state.cart = action.payload.cart;
      state.totalPrice = action.payload.totalPrice;
      //console.log(action.payload);

      //update the browser's local storage to cart contents survive refresh
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
        })
      );
    },

    //add an item to the cart if it has not already been added, and set the total price
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

    //remove item from the cart, and set the total price
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
      if (state.cart.length > 0) {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            ...state.cart,
          })
        );
      } else {
        localStorage.removeItem("cart");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
