import { create } from "zustand";
import { persist } from "zustand/middleware";

// The zustand equivalent of cartReducer.js + CartContext.jsx: one store,
// no <Provider> needed, and any component can subscribe to just the
// slice of it that it actually uses (see the *Selectors* section in each
// component that reads from this store).
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === dish.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { id: dish.id, name: dish.name, price: dish.price, qty: 1 },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clear: () => set({ items: [] }),

      // A plain function, not a hook: components should prefer the
      // useCartTotal selector below (so they re-render only when the
      // number actually changes), but this is handy outside components,
      // e.g. in an event handler: cartStore.getState().total().
      total: () =>
        get().items.reduce((sum, item) => sum + item.price * item.qty, 0),
    }),
    {
      // Exercise 6: persist middleware. This writes the store to
      // localStorage under this key after every change, and reads it
      // back on startup, so the cart survives a page refresh with no
      // extra code in any component.
      name: "addis-eats-cart",
    }
  )
);

// Narrow selector hooks. Each component below imports one of these
// (or writes its own inline selector) instead of reading the whole
// store, so it only re-renders when the specific value it asked for
// changes - not on every cart update.
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartCount = () =>
  useCartStore((state) => state.items.reduce((sum, item) => sum + item.qty, 0));
export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  );
