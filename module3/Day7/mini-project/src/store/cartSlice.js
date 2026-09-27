// Exercise 7: the same cart, rebuilt as a Redux Toolkit slice, purely for
// comparison against cartStore.js (zustand) and the original
// cart/cartReducer.js (plain useReducer + Context). This file is NOT
// imported by App.jsx or wired into the running app - there's no
// configureStore call and no <Provider> anywhere in this project. It
// exists only so the three approaches can be read side by side; see
// STATE_COMPARISON.md.

import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Redux Toolkit wraps every reducer in Immer, so "mutating" state
    // here is safe and produces a new state object under the hood -
    // unlike cartReducer.js, which has to spread everything by hand.
    addItem(state, action) {
      const dish = action.payload;
      const existing = state.items.find((item) => item.id === dish.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          qty: 1,
        });
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clear(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clear } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors, written the Redux way: plain functions of the whole store
// state, used with useSelector(selectCartTotal) if this were ever wired
// into an actual Redux store (state.cart, because of the slice's "name").
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
