import { createContext, useContext, useReducer, useMemo } from "react";
import { cartReducer, initialCartState } from "../cart/cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const total = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // useMemo here prevents a new { items, dispatch, total } object from being
  // created on every render of CartProvider. Without it, every consumer of
  // useCart would see a "new" context value each time CartProvider
  // re-renders for any reason, even one unrelated to the cart, which would
  // make them all re-render too (context consumers re-render whenever the
  // value they read changes, and object identity is how that's compared).
  // dispatch is stable across renders already; state.items and total are
  // the only values here that actually change, so they're the dependencies.
  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return ctx;
}
