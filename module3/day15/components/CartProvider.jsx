"use client"; // context + state => client

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);
const KEY = "addis-eats-cart";

function reducer(state, action) {
  switch (action.type) {
    case "load":
      return action.items;
    case "add": {
      const found = state.find((i) => i.id === action.dish.id);
      if (found) return state.map((i) => (i.id === found.id ? { ...i, qty: i.qty + 1 } : i));
      return [...state, { ...action.dish, qty: 1 }];
    }
    case "setQty":
      return state.map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i));
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);

  // Read storage AFTER hydration so server and first client render match.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "load", items: JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((dish) => dispatch({ type: "add", dish }), []);
  const setQty = useCallback((id, qty) => dispatch({ type: "setQty", id, qty }), []);
  const remove = useCallback((id) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo(
    () => ({
      items,
      ready,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, ready, add, setQty, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}
