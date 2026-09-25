// Exercise 3: call cartReducer directly with plain objects, no React,
// no test runner. Run with: node src/cart/cartReducer.manualtest.js

import { cartReducer, initialCartState } from "./cartReducer.js";

function check(label, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? "PASS" : "FAIL"} - ${label}`);
  if (!pass) {
    console.log("  expected:", JSON.stringify(expected));
    console.log("  actual:  ", JSON.stringify(actual));
  }
}

// add: a new dish appears with qty 1
let state = cartReducer(initialCartState, {
  type: "add",
  dish: { id: 1, name: "Doro Wat", price: 240 },
});
check("add new dish", state, {
  items: [{ id: 1, name: "Doro Wat", price: 240, qty: 1 }],
});

// add: adding the same dish again increases qty instead of duplicating
state = cartReducer(state, {
  type: "add",
  dish: { id: 1, name: "Doro Wat", price: 240 },
});
check("add same dish again increments qty", state, {
  items: [{ id: 1, name: "Doro Wat", price: 240, qty: 2 }],
});

// add: a second, different dish
state = cartReducer(state, {
  type: "add",
  dish: { id: 3, name: "Shiro", price: 150 },
});
check("add a second dish", state, {
  items: [
    { id: 1, name: "Doro Wat", price: 240, qty: 2 },
    { id: 3, name: "Shiro", price: 150, qty: 1 },
  ],
});

// remove: removes only the matching id
state = cartReducer(state, { type: "remove", id: 1 });
check("remove one dish", state, {
  items: [{ id: 3, name: "Shiro", price: 150, qty: 1 }],
});

// clear: empties the cart
state = cartReducer(state, { type: "clear" });
check("clear empties the cart", state, initialCartState);

// unknown action: state is returned unchanged
const unchanged = cartReducer(initialCartState, { type: "not-a-real-action" });
check("unknown action returns state unchanged", unchanged, initialCartState);
