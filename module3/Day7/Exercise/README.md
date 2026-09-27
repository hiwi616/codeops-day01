# Addis Eats - State Management, Compared (Day 7)

A Vite + React project. The cart moved from React Context + `useReducer` to
a zustand store with narrow selectors and persistence, and the same cart
was rebuilt a third time as a Redux Toolkit slice, purely to compare all
three approaches side by side.

## Where each exercise lives

1. **`useCart` throws when the provider is missing.** Already true before
   this exercise: `src/context/CartContext.jsx`'s `useCart()` throws
   `"useCart must be used inside a CartProvider"` if called outside one.
2. **Auth and theme split from the cart provider.** Also already true:
   `AuthContext.jsx` and `ThemeContext.jsx` were already separate files
   and separate providers from `CartContext.jsx`, each wrapped
   independently in `App.jsx`.
3. **"Highlight updates" profiling.** No code for this one - see
   `src/store/STATE_COMPARISON.md` > "Exercise 3" for the steps and what
   to expect before/after the zustand migration.
4. **zustand cart store.** `src/store/cartStore.js`: `items`, `addItem`,
   `removeItem`, `clear`, no provider needed.
5. **Narrow selectors, one component at a time.** `CartBadge.jsx`,
   `CheckoutPanel.jsx`, `pages/Menu.jsx`, `pages/DishDetail.jsx` and
   `pages/Cart.jsx` each now call a narrow selector (e.g. `useCartCount()`,
   `useCartStore(state => state.addItem)`) instead of one broad
   `useCart()`. See the table in `STATE_COMPARISON.md` for the full
   before/after per component.
6. **`persist` middleware.** `cartStore.js` wraps the store in zustand's
   `persist`, keyed `"addis-eats-cart"` — the cart survives a refresh with
   no extra code anywhere else.
7. **Redux Toolkit slice, not wired in.** `src/store/cartSlice.js` is the
   same cart as a `createSlice`. It is *not* imported by `App.jsx`; there's
   no `configureStore` and no `<Provider>` in this project. It exists so
   it can be read next to `cartStore.js` and `cart/cartReducer.js` — see
   `STATE_COMPARISON.md` for the full comparison.

## What's kept but unused, on purpose

`src/cart/cartReducer.js`, `src/cart/cartReducer.manualtest.js`, and
`src/context/CartContext.jsx` are still in the repo, but no component
imports them anymore — `App.jsx` no longer renders `<CartProvider>`.
They're kept as the "before" artifact so the three approaches can be
compared; see `STATE_COMPARISON.md`.

## How to verify

- **Cart still works everywhere:** add a dish from `/menu` or a dish's own
  page, check the header badge, `/cart`, and the checkout panel all agree.
- **Refresh survives:** add a dish, refresh the page (a normal window, not
  private/incognito), and the cart should still have it — this is new as
  of Exercise 6.
- **Manual reducer tests still pass** (they test the old, now-unused
  reducer, kept for comparison):
  ```bash
  node src/cart/cartReducer.manualtest.js
  ```
- **No console warnings:** run the app and click around; check DevTools.

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Project structure (new/changed since the Day 6 mini-project)

- `src/store/cartStore.js` - zustand store with `persist` middleware
- `src/store/cartSlice.js` - Redux Toolkit slice (comparison only, not wired in)
- `src/store/STATE_COMPARISON.md` - the full write-up for exercises 1-3 and 5-7
- `src/CartBadge.jsx`, `src/CheckoutPanel.jsx`, `src/pages/Menu.jsx`,
  `src/pages/DishDetail.jsx`, `src/pages/Cart.jsx` - migrated to zustand selectors
- `src/App.jsx` - `CartProvider` removed (zustand needs no provider)
- `src/cart/`, `src/context/CartContext.jsx` - kept, unused, for comparison
