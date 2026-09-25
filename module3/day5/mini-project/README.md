# Addis Eats, Assembled (Week 1 Project)

A Vite + React project. This brings together Days 26-30: components and props,
state and events, an API-driven menu with loading and error states, a category
filter, a cart that persists across screen transitions through Context, and a
custom `useFetch` hook.

## Requirements, and where each one is met

- **`useFetch` hook** returning `{ data, loading, error }`, with cleanup that
  aborts: `src/hooks/useFetch.js`. Used by `Menu.jsx`.
- **A pure `cartReducer`** with `add`, `remove`, `clear`: `src/cart/cartReducer.js`.
  It's a plain function — no React import, no hooks — so it can be called
  directly with plain objects. `src/cart/cartReducer.manualtest.js` does
  exactly that for every case, including an unknown action type (which
  throws, rather than silently doing nothing). Run it with:
  ```bash
  node src/cart/cartReducer.manualtest.js
  ```
- **`CartProvider`** using `useReducer`, providing `items`, `dispatch`, and
  the derived `total`: `src/context/CartContext.jsx`.
- **Header badge and checkout panel, both from context, no prop drilling.**
  `CartBadge.jsx` (rendered inside `Header`) and `CheckoutPanel.jsx` (rendered
  alongside `Menu` in `App`) both call `useCart()` directly. `App` never
  passes cart data down as a prop to either of them, or to anything in
  between.
- **A category filter driving the fetch.** In `Menu.jsx`, `category` is part
  of the URL passed to `useFetch` and part of its dependency array, so
  switching chips re-runs the effect and aborts the previous request. See
  "How to verify" below — this project's data is one static JSON file, so
  the *response* doesn't differ by category, but the fetch really does
  restart and the previous request really is cancelled.
- **Provider value memoized, one deliberate `useMemo`/`useCallback`.** The
  `CartProvider`'s context value is wrapped in `useMemo` (see the comment
  above it in `CartContext.jsx`): without it, every render of `CartProvider`
  would hand consumers a brand-new `{ items, dispatch, total }` object, so
  every context consumer would re-render even when the cart hadn't actually
  changed. `Menu`'s `handleAdd` is wrapped in `useCallback` for the same
  reason, paired with `Dish` being wrapped in `React.memo` in `Dish.jsx`: a
  new function on every `Menu` render (e.g. from typing in the search box)
  would otherwise count as a changed prop and defeat the memoization on
  every `Dish`.
- **No console warnings.** `Dish` declares full PropTypes; run the app and
  check DevTools console while clicking around.

## How to verify

- **Header badge, no prop drilling:** open `src/App.jsx` and confirm it
  never mentions cart items or count as a prop — only `<Header />` with no
  props. Add a dish, and the badge number should update.
- **Checkout panel matches the cart:** add a few dishes, check the numbers
  in `CheckoutPanel` match what's in the badge and what `Menu`'s "Cart
  total" line shows (they all read the same context).
- **Fetch cancellation:** open DevTools > Network, set throttling to "Slow
  3G", then click two category chips quickly. The first `dishes.json?...`
  request should show as "(canceled)".
- **Memoization:** open the React DevTools Profiler, record while typing in
  the search box, and check that dishes whose own data hasn't changed don't
  re-render (this is the effect of `React.memo` + `useCallback` together).

## Project structure

- `src/hooks/useFetch.js` - fetch hook: data/loading/error, aborts in cleanup
- `src/cart/cartReducer.js`, `src/cart/cartReducer.manualtest.js` - pure reducer + manual tests
- `src/context/CartContext.jsx` - `CartProvider`/`useCart`, memoized value
- `src/context/ThemeContext.jsx`, `src/ThemeToggle.jsx` - theme context (from Day 5 exercises)
- `src/CartBadge.jsx` - header badge, reads context directly
- `src/CheckoutPanel.jsx` - checkout panel, reads context directly
- `src/Menu.jsx` - category state driving `useFetch`, search, `useCallback`
- `src/Dish.jsx` - `React.memo`-wrapped, typed with PropTypes
- `src/DishList.jsx` - loading/error/empty early returns, mapped list keyed by id
- `src/CategoryBar.jsx`, `src/Card.jsx`, `src/OrderForm.jsx`, `src/Header.jsx`, `src/App.jsx`, `src/data.js`, `public/dishes.json`

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Commit history

The commits below build the project in the order of the "worked start":
reducer, then provider, then consumers.

1. Add pure cartReducer with manual tests
2. Add CartProvider with memoized context value
3. Add CartBadge and CheckoutPanel, both reading context directly
4. Make the category filter drive useFetch, with cancellation on change
5. Add React.memo and useCallback to the dish list, and document why
