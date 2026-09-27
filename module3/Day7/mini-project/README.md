# The Cart, Moved to a Store (Day 7 Mini-Project)

A Vite + React project. The routed app from Day 6 keeps its cart in a
zustand store, read everywhere through narrow selectors, while the auth
session stays in Context behind `RequireAuth` — with a persistence guard
so the cart survives a refresh, but the session doesn't have to.

## Requirements, and where each one is met

- **A `useX`-style guarded hook for every context that remains.**
  `src/hooks/useAuth.js` and `src/hooks/useTheme.js` each throw a specific
  message ("useAuth must be used inside an AuthProvider" /
  "useTheme must be used inside a ThemeProvider") if called outside their
  provider. The context files (`src/context/AuthContext.jsx`,
  `src/context/ThemeContext.jsx`) now export only the context object and
  its provider — the guarded hook lives in its own file.
- **Separate providers for auth and theme, no longer bundled.**
  They were already two separate files and two separate providers before
  this exercise; that hasn't changed. Each is wrapped independently in
  `src/App.jsx`.
- **A zustand cart store with `addItem`, `remove`, `clear`.**
  `src/store/cartStore.js`. (Earlier in this project's history this method
  was named `removeItem`; it's renamed to `remove` here to match.)
- **Every consumer reads through a narrow selector — no bare
  `useCartStore()` calls.** Checked with `grep -rn "useCartStore()" src`,
  which returns nothing. Every call site either uses one of the exported
  selector hooks (`useCartItems`, `useCartTotal`, `useCartCount`,
  `useCartRemove`, `useCartClear`) or an inline
  `useCartStore((state) => state.oneField)`.
- **`persist` middleware, order restored on reload.** Already configured
  in `cartStore.js`, keyed `"addis-eats-cart"`.

## Why the cart is a store and the session is not

The cart has many consumers that each need a different slice of it —
the header badge (count), the checkout panel (items, total, remove,
clear), the menu and dish pages (just `addItem`) — so a store with narrow
selectors keeps each one from re-rendering on cart changes it doesn't
care about. The session has effectively one real consumer, `RequireAuth`
(plus `Login`, which only calls `login()` once), so Context's downside —
every consumer re-renders when the value changes — never shows up in
practice, and there was nothing to gain by moving it.

## Check yourself

- **Does removing `CartProvider` break anything?** No — `App.jsx` no
  longer renders one, and the app still works, because zustand's `create`
  returns a hook that works with no provider at all.
- **Does adding a dish re-render the whole header, or only the badge?**
  Only the badge. `CartBadge.jsx` is the only piece of `Layout`'s header
  that reads the cart (via `useCartCount()`); `Layout` and the rest of the
  header don't call any cart selector, so React has no reason to
  re-render them when the cart changes.
- **Does the order survive a full page refresh?** Yes — that's the
  `persist` middleware. Confirmed by adding a dish, refreshing, and
  checking it's still there (only in a normal window; private/incognito
  windows clear `localStorage`).
- **Does every component select one value rather than the whole store?**
  Yes — see the "no bare `useCartStore()` calls" point above.
- **Does using a context value outside its provider throw a message you
  can act on?** Yes — both `useAuth()` and `useTheme()` throw a specific
  "must be used inside a ...Provider" message, not a generic
  "cannot read properties of null."
- **Can you say in one sentence why the session stayed in context?**
  See "Why the cart is a store and the session is not" above — in short,
  the session has too few consumers for Context's re-render cost to
  matter, so there was no problem to solve by moving it.

## Kept from the Day 7 exercise, not required by this mini-project

`src/cart/cartReducer.js`, `src/context/CartContext.jsx`, and
`src/store/cartSlice.js` + `src/store/STATE_COMPARISON.md` are still in
the repo — the original Context-based cart and a Redux Toolkit rebuild of
it, kept only for comparison. None of them are imported by the running
app.

## How to run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Project structure (changed since the Day 7 exercise)

- `src/hooks/useAuth.js`, `src/hooks/useTheme.js` - guarded hooks, split out of their context files
- `src/context/AuthContext.jsx`, `src/context/ThemeContext.jsx` - now export only the context + provider
- `src/store/cartStore.js` - `remove` (renamed from `removeItem`), plus `useCartRemove`/`useCartClear` selector hooks
- `src/CheckoutPanel.jsx` - updated to use the renamed selectors
